using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Akka.Actor;
using Akka.DI.Core;
using Akka.DI.Extensions.DependencyInjection;
using CoronaGlass.Core;
using coronaGlass.Dropbox;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption;
using Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.ConfigurationModel;
using Microsoft.AspNetCore.DataProtection.KeyManagement;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Server.Kestrel;
using Microsoft.AspNetCore.SpaServices;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using VueCliMiddleware;
using Web.Behaviours;
using Web.Infrastructure;
using Web.Infrastructure.Services;
using Web.Middlewares;
using Web.Resources;

namespace Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMediatR(Assembly.GetExecutingAssembly());
            services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehaviour<,>));

            services.Configure<EmailSettings>(Configuration.GetSection("EmailSettings"));
            services.AddTransient<IEmailSender, MessageSender>();

            services.Configure<FileStorageSettings>(Configuration.GetSection("FileStorageSettings"));
            services.AddTransient<IFileStorage, DropboxStorage>();

            // NOTE: PRODUCTION Ensure this is the same path that is specified in your webpack output
            services.AddSpaStaticFiles(opt => opt.RootPath = "wwwroot/app");

            services.AddLocalization(opt => opt.ResourcesPath = "Resources");

            services.AddControllersWithViews()
                .AddViewLocalization(LanguageViewLocationExpanderFormat.Suffix,
                    options => options.ResourcesPath = "Resources")
                .AddDataAnnotationsLocalization(resOptions =>
                {
                    resOptions.DataAnnotationLocalizerProvider =
                        (type, factory) => factory.Create(typeof(SharedResources));
                })
                .AddCookieTempDataProvider();

            services.AddLocalization(options => options.ResourcesPath = "Resources");
            services.AddSingleton<SharedLocalizationService>();

            //.AddSessionStateTempDataProvider();services.AddSession(); 
            //services.Configure<CookieTempDataProviderOptions>(options =>
            //{
            //    options.Cookie.SameSite = SameSiteMode.Lax; // By default this is set to 'Strict'.
            //});

            services.Configure<RequestLocalizationOptions>(options =>
            {
                var supportedCultures = new[]
                {
                    new CultureInfo("en"),
                    new CultureInfo("he"),
                    new CultureInfo("ru")
                };

                options.DefaultRequestCulture = new RequestCulture("he");
                options.SupportedCultures = supportedCultures;
                options.SupportedUICultures = supportedCultures;

                options.ApplyCurrentCultureToResponseHeaders = true;
            });

            //services
            //    .AddDataProtection()
            //    //.PersistKeysToFileSystem(new DirectoryInfo(@"sharedDisk\temp-keys\"))
            //    .UseCryptographicAlgorithms(new AuthenticatedEncryptorConfiguration()
            //    {
            //        EncryptionAlgorithm = EncryptionAlgorithm.AES_256_CBC,
            //        ValidationAlgorithm = ValidationAlgorithm.HMACSHA256
            //    });

            services.AddAntiforgery(o => o.HeaderName = "XSRF-TOKEN");

            services.AddSingleton<PostOfficeActor>();
            services.AddScoped<PostmanActor>();
            services.AddSingleton<StorageManager>();
            services.AddSingleton(serviceProvider =>
            {
                var coronaService = ActorSystem.Create("coronaService");
                coronaService.UseServiceProvider(serviceProvider);
                return coronaService;
            });

            services.AddSingleton<PostmanActorProvider>(provider =>
            {
                var actorSystem = provider.GetService<ActorSystem>();
                var postOffice = actorSystem?.ActorOf(actorSystem.DI().Props<PostOfficeActor>());
                return () => postOffice;
            });
            services.AddSingleton<StorageActorProvider>(provider =>
            {
                var actorSystem = provider.GetService<ActorSystem>();
                var storeManager = actorSystem?.ActorOf(actorSystem.DI().Props<StorageManager>());
                return () => storeManager;
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IHostApplicationLifetime lifetime)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            //app.UseHttpsRedirection();

            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor 
                                   | ForwardedHeaders.XForwardedProto 
                                   | ForwardedHeaders.XForwardedHost
            });

            var locOptions = app.ApplicationServices.GetService<IOptions<RequestLocalizationOptions>>();
            app.UseRequestLocalization(locOptions?.Value);

            app.UseStaticFiles();

            // PRODUCTION uses webpack static files
            app.UseSpaStaticFiles();

            app.UseRouting();
            app.UseErrorHandler();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapFallback(HandleFallback);
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");

                // Only do for development
                if (env.IsDevelopment())
                {
                    //endpoints.MapToVueCliProxy(
                    //    "{*path}",
                    //    new SpaOptions { SourcePath = "client-app" },
                    //    //npmScript: (System.Diagnostics.Debugger.IsAttached) ? "serve" : null,
                    //    npmScript: "watch",
                    //    regex: "Compiled successfully",
                    //    forceKill: true,
                    //    wsl: false // Set to true if you are using WSL on windows. For other operating systems it will be ignored
                    //);
                }
            });

            lifetime.ApplicationStarted.Register(() =>
            {
                app.ApplicationServices.GetService<ActorSystem>();
            });
            lifetime.ApplicationStopping.Register(() =>
            {
                app.ApplicationServices.GetService<ActorSystem>()?.Terminate().Wait();
            });
        }

        private async Task HandleFallback(HttpContext context)
        {
            var apiPathSegment = new PathString("/api"); // Find out from the request URL if this is a request to the API or just a web page on the Blazor WASM app.
            bool isApiRequest = context.Request.Path.StartsWithSegments(apiPathSegment);
            if (!isApiRequest)
            {
                //context.Response.Redirect("/"); // This is a request for a web page so just do the normal out-of-the-box behaviour.
                context.Response.Redirect(context.Request.PathBase + "/"); // This is a request for a web page so just do the normal out-of-the-box behaviour.
            }
            //else
            //{
            //    context.Response.StatusCode = StatusCodes.Status404NotFound; // This request had nothing to do with the Blazor app. This is just an API call that went wrong.
            //}
            await Task.CompletedTask;
        }
    }
}
