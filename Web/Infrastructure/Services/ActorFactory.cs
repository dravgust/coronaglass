using System;
using System.Collections.Concurrent;
using Akka.Actor;
using Microsoft.Extensions.DependencyInjection;
using Akka.DI.Core;

namespace Web.Infrastructure.Services
{
    public interface IActor<out TActor> where TActor : ActorBase
    { 
        public IActorRef Ref { get; }
    }

    public interface IActorFactory
    {
        IActorRef CreateActor<TActor>() where TActor : ActorBase;
    }

    public class ActorFactory : IActorFactory
    {
        private readonly ActorSystem _actorSystem;
        private readonly ConcurrentDictionary<string, IActorRef> _actorRefs = new ();
        public ActorFactory(IServiceProvider serviceProvider)
        {
           _actorSystem = serviceProvider.GetService<ActorSystem>();;
        }
        public IActorRef CreateActor<TActor>() where TActor : ActorBase
        {
            var key = typeof(TActor).Name;
            if (!_actorRefs.TryGetValue(key, out var actorRef))
            {
                actorRef = _actorSystem?.ActorOf(_actorSystem.DI().Props<TActor>());
                _actorRefs[key] = actorRef;
            }

            return actorRef;
        }
    }

    public class ActorRef<TActor> : IActor<TActor> where TActor : ActorBase
    {
        public IActorRef Ref { get; }
        public ActorRef(IActorFactory factory)
        {
            Ref = factory.CreateActor<TActor>();
        }
    }
}
