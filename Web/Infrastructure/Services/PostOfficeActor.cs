using System;
using System.Collections.Concurrent;
using Akka.Actor;
using Akka.Persistence;
using Microsoft.Extensions.Logging;

namespace Web.Infrastructure.Services
{
    public class PostOfficeActor : AtLeastOnceDeliveryReceiveActor
    {
        public override string PersistenceId => Context.Self.Path.Name;

        private class DoSend { }
        private class CleanSnapshots { }

        private ICancelable _messageSend;

        private IActorRef _postmanActor;

        private readonly IEmailSender _emailSender;

        private readonly ILogger<PostOfficeActor> _logger;

        private ICancelable _snapshotCleanup;

        private readonly BlockingCollection<PostMessage> _messages = new();

        public PostOfficeActor(IEmailSender emailSender, ILogger<PostOfficeActor> logger)
        {
            _emailSender = emailSender ?? throw new ArgumentNullException(nameof(emailSender));
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
                Deliver(this._postmanActor.Path, messageId => new DeliveryEnvelope<PostMessage>(send, messageId));
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
                // log or do something else
            });
        }

        protected override void PreStart()
        {
            //this._messageSend = Context.System.Scheduler.ScheduleTellRepeatedlyCancelable(TimeSpan.FromSeconds(0),
            //    TimeSpan.FromSeconds(30), Self, new DoSend(), Self);

            this._postmanActor = Context.ActorOf(Props.Create(() => new PostmanActor(_emailSender)), "postman");

            this._snapshotCleanup = Context.System.Scheduler.ScheduleTellRepeatedlyCancelable(TimeSpan.FromSeconds(10),
                TimeSpan.FromSeconds(10), Self, new CleanSnapshots(), Self);

            base.PreStart();
        }

        protected override void PostStop()
        {
            this._snapshotCleanup?.Cancel();
            this._messageSend?.Cancel();

            base.PostStop();
        }
    }
}
