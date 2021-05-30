using System;
using System.Collections.Generic;
using System.Linq;
using Akka.Actor;
using Akka.DI.Core;
using Akka.Event;
using Web.Features.Customer;
using Web.Models;

namespace Web.Infrastructure.Services
{
    public class CustomerStorageActor : ReceiveActor, IWithUnboundedStash
    {
        private readonly ILoggingAdapter _logger = Context.GetLogger();

        private const string Folder = "/WebForm";
        private const string File = "Customers.xlsx";

        protected IActorRef FileStorage;
        public IStash Stash { get; set; }

        private CertificateRequest _certificateRequest;

        public CustomerStorageActor()
        {
            Become(Ready);
        }

        private void Ready()
        {
            Receive<CertificateRequest>(message =>
            {
                _certificateRequest = message;
                FileStorage.Ask(new FileStorageActor.Find(Folder, File)).PipeTo(Self);
                Become(InProcess);
            });
        }

        private void InProcess()
        {
            Receive<CertificateRequest>(request => Stash.Stash());
            Receive<FileStorageActor.FindResult>(result =>
            {
                if (result != null && result.Any())
                {
                    FileStorage.Ask(new FileStorageActor.Get(Folder, File)).PipeTo(Self);
                }
                else
                {
                    Self.Tell(new List<CertificateRequest> { _certificateRequest });
                }
            });
            Receive<FileStorageActor.GetResult>(result =>
            {
                var ie = new ImportExport();
                try
                {
                    var import = ie.ImportCustomerForm(result.ToArray());
                    var customers = new List<CertificateRequest>(import)
                    {
                        _certificateRequest
                    };
                    Self.Tell(customers);
                }
                catch (Exception e)
                {
                    Self.Tell(new Status.Failure(e));
                }
                
            });
            Receive<List<CertificateRequest>>(customers =>
            {
                var ie = new ImportExport();
                try
                {
                    var export = ie.Export(customers);
                    FileStorage.Tell(new FileStorageActor.Save(Folder, File, export));
                    Self.Tell(new AppendComplete());
                }
                catch (Exception e)
                {
                    Self.Tell(new Status.Failure(e));
                }
            });
            Receive<Status.Failure>(e =>
            {
                _logger.Error($"{nameof(CustomerStorageActor)}| {e}.");

                Self.Tell(new AppendComplete());
            });
            Receive<AppendComplete>(message => {
                Become(Ready);
                Stash.UnstashAll();
            });
        }

        protected override void PreStart()
        {
            //this._messageSend = Context.System.Scheduler.ScheduleTellRepeatedlyCancelable(TimeSpan.FromSeconds(0),
            //    TimeSpan.FromSeconds(30), Self, new DoSend(), Self);

            FileStorage = Context.Child(nameof(FileStorageActor)).Equals(ActorRefs.Nobody)
                ? Context.ActorOf(Context.System.DI().Props<FileStorageActor>(), nameof(FileStorageActor))
                : Context.Child(nameof(FileStorageActor));

            base.PreStart();

            _logger.Debug("Started.");
        }

        protected override void PostStop() => _logger.Debug("Stopped.");

        protected override SupervisorStrategy SupervisorStrategy()
        {
            return new OneForOneStrategy(
                maxNrOfRetries: 5,
                withinTimeRange: TimeSpan.FromMinutes(1),
                localOnlyDecider: ex =>
                {
                    return ex switch
                    {
                        ArgumentException ae => Directive.Resume,
                        NullReferenceException ne => Directive.Stop,
                        _ => Directive.Restart
                    };
                }
            );
        }

        public class AppendNew
        {
            public CertificateRequest Data { get; }

            public AppendNew(CertificateRequest data)
            {
                Data = data ?? throw new ArgumentNullException(nameof(data));
            }
        } 
        
        public class AppendComplete
        {
            
        }
    }
}
