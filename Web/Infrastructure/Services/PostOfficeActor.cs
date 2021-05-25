using System;
using System.Collections.Concurrent;
using Akka.Actor;
using Akka.DI.Core;
using Akka.Persistence;
using CoronaGlass.Core;
using Microsoft.Extensions.Logging;

namespace Web.Infrastructure.Services
{
    public class PostOfficeActor : AtLeastOnceDeliveryReceiveActor
    {
        public override string PersistenceId => Context.Self.Path.Name;

        private class DoSend { }
        private class CleanSnapshots { }

        private ICancelable _messageSend;

        private readonly ILogger<PostOfficeActor> _logger;

        private ICancelable _snapshotCleanup;

        private readonly BlockingCollection<PostMessage> _messages = new();

        public PostOfficeActor(ILogger<PostOfficeActor> logger)
        {
            _logger = logger;

            // recover the most recent at least once delivery state
            Recover<SnapshotOffer>(offer => offer.Snapshot is AtLeastOnceDeliverySnapshot, offer =>
            {
                var snapshot = offer.Snapshot as AtLeastOnceDeliverySnapshot;
                SetDeliverySnapshot(snapshot);
            });
            Command<DoSend>(send =>
            {
                if(_messages.TryTake(out var message))
                    Self.Tell(message);
            });
            Command<PostMessage>(send =>
            {
                var postman = Context.Child("postman");
                Deliver(postman.Path, messageId => new DeliveryEnvelope<PostMessage>(send, messageId));
                // save the full state of the at least once delivery actor
                // so we don't lose any messages upon crash
                SaveSnapshot(GetDeliverySnapshot());
            });
            Command<DeliveryAck>(ack =>
            {
                ConfirmDelivery(ack.MessageId);
            });
            Command<CleanSnapshots>(clean =>
            {
                // save the current state (grabs confirmations)
                SaveSnapshot(GetDeliverySnapshot());
            });
            Command<SaveSnapshotSuccess>(saved =>
            {
                var seqNo = saved.Metadata.SequenceNr;
                DeleteSnapshots(new SnapshotSelectionCriteria(seqNo, saved.Metadata.Timestamp.AddMilliseconds(-1))); // delete all but the most current snapshot
            });

            Command<SaveSnapshotFailure>(failure =>
            {
                _logger.LogError($"{failure.ToJson()}");
            });
        }

        protected override void PreStart()
        {
            //this._messageSend = Context.System.Scheduler.ScheduleTellRepeatedlyCancelable(TimeSpan.FromSeconds(0),
            //    TimeSpan.FromSeconds(30), Self, new DoSend(), Self);

            Context.ActorOf(Context.System.DI().Props<PostmanActor>(), "postman");

            this._snapshotCleanup = Context.System.Scheduler.ScheduleTellRepeatedlyCancelable(TimeSpan.FromSeconds(30),
                TimeSpan.FromSeconds(30), Self, new CleanSnapshots(), Self);

            base.PreStart();
        }

        //protected override SupervisorStrategy SupervisorStrategy()
        //{
        //    return new OneForOneStrategy(
        //        maxNrOfRetries: 10,
        //        withinTimeRange: TimeSpan.FromMinutes(1),
        //        localOnlyDecider: ex =>
        //        {
        //            return ex switch
        //            {
        //                //ArgumentException ae => Directive.Resume,
        //                //NullReferenceException ne => Directive.Stop,
        //                _ => Directive.Restart
        //            };
        //        }
        //    );
        //}

        protected override void PostStop()
        {
            this._snapshotCleanup?.Cancel();
            this._messageSend?.Cancel();

            base.PostStop();
        }
    }
}
