using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Diagnostics;
using Hocon.Extensions.Configuration;
using NLog;
using NLog.Web;
using LogLevel = Microsoft.Extensions.Logging.LogLevel;

namespace Web
{
    public class Program
    {
        private const string ConfigFile = "nlog.config";

        public static void Main(string[] args)
        {
            var logger = NLogBuilder
                .ConfigureNLog(ConfigFile)
                .GetCurrentClassLogger();

            Trace.Listeners.Add(new NLogTraceListener());

            try
            {
                CreateHostBuilder(args).Build().Run();
            }
            catch (Exception e)
            {
                logger.Error(e, "Stopped because of exception");
                throw;
            }
            finally
            {
                LogManager.Shutdown();
            }
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                })
                .ConfigureAppConfiguration((hostingContext, config) =>
                {
                    // We inject the HOCON configuration file using this function call,
                    // the rest of the code are there to make sure that the final configuration
                    // conforms to the Microsoft standard on loading a full configuration stack.
                    var env = hostingContext.HostingEnvironment;
                    config.AddHoconFile("appsettings.conf", optional: false, reloadOnChange: true)
                        .AddHoconFile($"appsettings.{env.EnvironmentName}.conf", optional: true, reloadOnChange: true);
                })
                .ConfigureLogging(logging =>
                {
                    logging.ClearProviders();
                    logging.SetMinimumLevel(LogLevel.Trace);
                })
                .UseNLog();
    }
}
