using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Akka.Actor;
using Akka.DI.Core;
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

        public IStash Stash { get; set; }

        public CustomerStorageActor(ILogger<CustomerStorageActor> logger)
        {
            _logger = logger;

            ReceiveAsync<AppendNew>(Append);
            //Become(Ready);
        }

        //private void Ready()
        //{
        //    ReceiveAsync<AppendNew>(message =>
        //    {
        //        Append(message);
        //    });
        //}

        public async Task Append(AppendNew cmd)
        {
            try
            {
                var fileStorage = Context.Child("fileStorage");

                var ie = new ImportExport();
                var customers = new List<CertificateRequest>();
                var search = (List<string>)await fileStorage.Ask(new FileStorageActor.Find(Folder, File));
                    //.PipeTo(Self, failure: ex => new Status.Failure(ex));

                if (search != null && search.Any())
                {
                    var iData = (byte[])await fileStorage.Ask(new FileStorageActor.Get(Folder, File));
                    customers.AddRange(ie.ImportCustomerForm(iData));
                }

                customers.Add(cmd.Data);
                var eData = ie.Export(customers);

                fileStorage.Tell(new FileStorageActor.Save(Folder, File, eData));
            }
            catch (Exception e)
            {
                Trace.WriteLine(e.Message);
            }
        }

        protected override void PreStart()
        {
            //this._messageSend = Context.System.Scheduler.ScheduleTellRepeatedlyCancelable(TimeSpan.FromSeconds(0),
            //    TimeSpan.FromSeconds(30), Self, new DoSend(), Self);

            Context.ActorOf(Context.System.DI().Props<FileStorageActor>(), "fileStorage");

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
                        _ => Directive.Stop
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
    }
}
