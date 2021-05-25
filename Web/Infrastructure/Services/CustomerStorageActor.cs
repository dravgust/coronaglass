using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using Akka.Actor;
using Akka.DI.Core;
using CoronaGlass.Core;
using Microsoft.Extensions.Logging;
using Web.Features.Customer;
using Web.Models;

namespace Web.Infrastructure.Services
{
    public class CustomerStorageActor : ReceiveActor, IWithUnboundedStash
    {
        private readonly ILogger<CustomerStorageActor> _logger;

        private const string Folder = "/WebForm";
        private const string File = "Customers.xlsx";

        private IActorRef _fileStorage;
        public IStash Stash { get; set; }

        private CertificateRequest _certificateRequest;

        public CustomerStorageActor(ILogger<CustomerStorageActor> logger)
        {
            _logger = logger;
            Become(Ready);
        }

        private void Ready()
        {
            Receive<CertificateRequest>(message =>
            {
                _certificateRequest = message;
                _fileStorage.Ask(new FileStorageActor.Find(Folder, File)).PipeTo(Self);
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
                    _fileStorage.Ask(new FileStorageActor.Get(Folder, File)).PipeTo(Self);
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
                    _fileStorage.Tell(new FileStorageActor.Save(Folder, File, export));
                    Self.Tell(new AppendComplete());
                }
                catch (Exception e)
                {
                    Self.Tell(new Status.Failure(e));
                }
            });
            Receive<Status.Failure>(result =>
            {
                Trace.WriteLine(result.ToJson());
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

            _fileStorage = Context.ActorOf(Context.System.DI().Props<FileStorageActor>(), "fileStorage");

            base.PreStart();
        }

        protected override SupervisorStrategy SupervisorStrategy()
        {
            return new OneForOneStrategy(
                maxNrOfRetries: 10,
                withinTimeRange: TimeSpan.FromMinutes(1),
                localOnlyDecider: ex =>
                {
                    return ex switch
                    {
                        //ArgumentException ae => Directive.Resume,
                        //NullReferenceException ne => Directive.Restart,
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
