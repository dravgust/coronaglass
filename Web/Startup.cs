using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.SpaServices;
using VueCliMiddleware;
using Web.Behaviours;
using Web.Middlewares;

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

            // NOTE: PRODUCTION Ensure this is the same path that is specified in your webpack output
            services.AddSpaStaticFiles(opt => opt.RootPath = "wwwroot/app");

            services.AddControllersWithViews();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
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

            app.UseStaticFiles();

            // PRODUCTION uses webpack static files
            app.UseSpaStaticFiles();

            app.UseRouting();
            app.UseMiddleware<ErrorHandlerMiddleware>();
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
