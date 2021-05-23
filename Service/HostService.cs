using System;
using System.Diagnostics;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using Akka.Actor;
using Akka.Configuration;
using Akka.DI.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Service
{
    public class HostService : IHostedService
    {
        protected ActorSystem System;

        private readonly IServiceProvider _serviceProvider;

        public HostService(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            var config = ConfigurationFactory.ParseString(File.ReadAllText("host.conf"));

            System = ActorSystem.Create("MyServer", config);
            System.UseServiceProvider(_serviceProvider);
            
            System.ActorOf(Props.Create(() => new ChatServerActor()), "ChatServer");
            return Task.CompletedTask;
        }

        public async Task StopAsync(CancellationToken cancellationToken)
        {
            await CoordinatedShutdown.Get(System).Run(CoordinatedShutdown.ClrExitReason.Instance);
        }
    }

    public class ChatServerActor : ReceiveActor
    {
        public ChatServerActor()
        {
            Receive<string>(message =>
            {
                Trace.WriteLine(message);
            });
        }
    }

    //public class ChatClientActor : ReceiveActor
    //{
    //    private readonly ActorSelection _server = Context.ActorSelection("akka.tcp://MyServer@localhost:9999/user/ChatServer");

    //    public ChatClientActor()
    //    {
    //        Receive<string>(message =>
    //        {
    //            _server.Tell(message);
    //        });
    //    }
    //}
}
