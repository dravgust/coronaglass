using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Akka.Actor;
using Akka.DI.Core;
using Microsoft.Extensions.Logging;
using Web.Features.Customer;
using Web.Models;

namespace Web.Infrastructure.Services
{
    public class CustomerManagerActor : ReceiveActor
    {
        private readonly ILogger<CustomerManagerActor> _logger;

        public CustomerManagerActor(ILogger<CustomerManagerActor> logger)
        {
            _logger = logger;

            Receive<UpdateFileCommand>(async cmd => await Update(cmd, cmd.Data));
        }

        public async Task Update(FileCommand cmd, CertificateRequest data)
        {
            var fileStorage = Context.Child("fileStorage");

            var ie = new ImportExport();
            var customers = new List<CertificateRequest>();
            var search = (List<string>)await fileStorage.Ask(new SearchFileCommand(cmd.Folder, cmd.Name));

            if (search != null && search.Any())
            {
                var iData = (byte[]) await fileStorage.Ask(new GetFileCommand(cmd.Folder, cmd.Name));
                customers.AddRange(ie.ImportCustomerForm(iData));
            }

            customers.Add(data);
            var eData = ie.Export(customers);

            fileStorage.Tell(new StoreFileCommand(cmd.Folder, cmd.Name, eData));
        }

        protected override void PreStart()
        {
            //this._messageSend = Context.System.Scheduler.ScheduleTellRepeatedlyCancelable(TimeSpan.FromSeconds(0),
            //    TimeSpan.FromSeconds(30), Self, new DoSend(), Self);

            Context.ActorOf(Context.System.DI().Props<FileStorageActor>(), "fileStorage");

            base.PreStart();
        }
    }
}
