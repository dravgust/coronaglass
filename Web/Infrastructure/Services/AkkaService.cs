//using System;
//using System.Threading;
//using System.Threading.Tasks;
//using Akka.Actor;
//using Akka.DependencyInjection;
//using Akka.DI;
//using Akka.DI.Extensions.DependencyInjection;
//using Microsoft.Extensions.Hosting;

//namespace Web.Infrastructure.Services
//{
//    public sealed class AkkaService : IHostedService
//    {
//        private IActorRef _apiMaster;
//        private ActorSystem ClusterSystem;
//        private IActorRef _downloadMaster;

//        private readonly IServiceProvider _serviceProvider;

//        public AkkaService(IServiceProvider sp)
//        {
//            _serviceProvider = sp;
//        }

//        public Task StartAsync(CancellationToken cancellationToken)
//        {
//            var config = HoconLoader.ParseConfig("tracker.hocon");
//            var bootstrap = BootstrapSetup.Create()
//                .WithConfig(config.ApplyOpsConfig()) // injects environment variables into HOCON
//                .WithActorRefProvider(ProviderSelection.Cluster.Instance); // launch Akka.Cluster

//            // N.B. `WithActorRefProvider` isn't actually needed here 
//            // the HOCON file already specifies Akka.Cluster

//            // enable DI support inside this ActorSystem, if needed
//            var diSetup = ServiceProviderSetup.Create(_serviceProvider);

//            // merge this setup (and any others) together into ActorSystemSetup
//            var actorSystemSetup = bootstrap.And(diSetup);

//            // start ActorSystem
//            ClusterSystem = ActorSystem.Create("webcrawler", actorSystemSetup);

//            ClusterSystem.StartPbm(); // start Petabridge.Cmd (https://cmd.petabridge.com/)

//            // instantiate actors
//            _apiMaster = ClusterSystem.ActorOf(Props.Create(() => new ApiMaster()), "api");
//            _downloadMaster = ClusterSystem.ActorOf(Props.Create(() => new DownloadsMaster()), "downloads");

//            return Task.CompletedTask;
//        }

//        public async Task StopAsync(CancellationToken cancellationToken)
//        {
//            // strictly speaking this may not be necessary - terminating the ActorSystem would also work
//            // but this call guarantees that the shutdown of the cluster is graceful regardless
//            await CoordinatedShutdown.Get(ClusterSystem).Run(CoordinatedShutdown.ClrExitReason.Instance);
//        }
//    }
//}
