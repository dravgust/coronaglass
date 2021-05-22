using System.IO;
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

        [Route("download")]
        public async Task<IActionResult> Download()
        {
            var memory = new MemoryStream();
            await using (var fs = new FileStream("Files/Certificate.pdf", FileMode.Open))
                await fs.CopyToAsync(memory);
            memory.Position = 0;
            return File(memory, "application/pdf", "WarrantyCert.pdf");
        }
    }
}
