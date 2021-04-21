using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Web.Features.Customer;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly IMediator _mediator;

        public CustomerController(IMediator mediator)
        {
            this._mediator = mediator;
        }

        [Route("certificate")]
        public async Task<IActionResult> Certificate(CertificateRequest query, CancellationToken token) => 
            Ok(await _mediator.Send(query, token));

        //public async Task<IActionResult> OnPostExportAsync()
        //{
        //    var sWebRootFolder = _hostingEnvironment.WebRootPath;
        //    const string sFileName = @"attachment.pdf";
        //    var file = Path.Combine(sWebRootFolder, "storage", sFileName);

        //    var memory = new MemoryStream();
        //    using (var fs = new FileStream(file, FileMode.Open))
        //    {
        //        await fs.CopyToAsync(memory);
        //    }
        //    memory.Position = 0;
        //    return File(memory, "application/pdf", "certificate.pdf");
        //}
    }
}
