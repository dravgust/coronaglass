using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        [Route("certificate")]
        public async Task<IActionResult> Certificate(CertificateQuery query)
        {
            return Ok(await Task.FromResult(query));
        }
    }

    [JsonObject]
    public class CertificateQuery
    {
        [JsonProperty("firstName")]
        public string FirstName { set; get; }
        [JsonProperty("lastName")]
        public string LastName { set; get; }
        [JsonProperty("phone")]
        public string Phone { set; get; }
        [JsonProperty("email")]
        public string Email { set; get; }
        [JsonProperty("address")]
        public string Address { set; get; }
        [JsonProperty("projectName")]
        public string ProjectName { set; get; }
        [JsonProperty("constructor")]
        public string Constructor { set; get; }
        [JsonProperty("keyReceived")]
        public DateTime KeyReceived { set; get; }
    }
}
