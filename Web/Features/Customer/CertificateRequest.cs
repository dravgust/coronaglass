using System;
using System.Threading;
using System.Threading.Tasks;
using CoronaGlass.Core;
using MediatR;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Web.Features.Tools;
using Web.Infrastructure;

namespace Web.Features.Customer
{
    [JsonObject]
    public class CertificateRequest : IRequest<bool>
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

        public class CertificateRequestHandler : IRequestHandler<CertificateRequest, bool>
        {
            private readonly ILogger<RunOptimizationQuery.OptimizationQueryHandler> _logger;
            private readonly IFileStorage _fileStorage;

            private readonly IEmailSender _emailSender;
            public CertificateRequestHandler(IFileStorage fileStorage, IEmailSender emailSender, ILogger<RunOptimizationQuery.OptimizationQueryHandler> logger)
            {
                _fileStorage = fileStorage;
                _emailSender = emailSender;
                _logger = logger;
            }

            public async Task<bool> Handle(CertificateRequest request, CancellationToken cancellationToken)
            {

                var email = "dravgust@hotmail.com";
                var subject = "Customer Request";
                var body = $"customer: sent defect.";

                await _emailSender.SendEmailAsync(email, subject, body);

                return true;
            }
        }
    }
}
