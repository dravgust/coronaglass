using System;
using System.Configuration;
using System.Threading;
using System.Threading.Tasks;
using Akka.Actor;
using Akka.Configuration;
using Akka.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

namespace Service
{
    public class HostService : IHostedService
    {
        protected ActorSystem System;

        private readonly IServiceProvider _serviceProvider;

        private readonly IConfiguration _configuration;

        public HostService(IServiceProvider serviceProvider, IConfiguration configuration)
        {
            _serviceProvider = serviceProvider;
            _configuration = configuration;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            var diSetup = ServiceProviderSetup.Create(_serviceProvider);
            var akkaConfig = _configuration.GetSection("Akka").Get<AkkaConfig>();
            var config = ConfigurationFactory.FromObject(new { akka = akkaConfig });
            System = ActorSystem.Create("coronaService", config);

            return Task.CompletedTask;
        }

        public async Task StopAsync(CancellationToken cancellationToken)
        {
            await CoordinatedShutdown.Get(System).Run(CoordinatedShutdown.ClrExitReason.Instance);
        }
    }
}
