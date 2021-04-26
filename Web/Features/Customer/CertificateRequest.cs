using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using CoronaGlass.Core;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using VralumGlassWeb.Data;
using Web.Extensions;
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
            private readonly ILogger<OptimizationRequest.OptimizationRequestHandler> _logger;
            private readonly IFileStorage _fileStorage;

            private readonly IEmailSender _emailSender;
            public CertificateRequestHandler(IFileStorage fileStorage, IEmailSender emailSender, ILogger<OptimizationRequest.OptimizationRequestHandler> logger)
            {
                _fileStorage = fileStorage;
                _emailSender = emailSender;
                _logger = logger;
            }

            public async Task<bool> Handle(CertificateRequest request, CancellationToken cancellationToken)
            {
                //Send PDF, xls record
                var email = request.Email;
                var subject = "Certificate";
                var body = $"Certificate";

                var contentType = new System.Net.Mime.ContentType
                {
                    MediaType = System.Net.Mime.MediaTypeNames.Application.Pdf,
                    Name = "Certificate.pdf"
                };
                var attachment = new Attachment("Files/Certificate.pdf", contentType);

                await _emailSender.SendEmailAsync(email, subject, body, new List<Attachment>{ attachment });

                var deliveryFolder = $"/WebForm";
                const string fileName = "Customers.xlsx";

                List<string> search = null;
                var ie = new ImportExport();
                var customers = new List<CertificateRequest>();
                try
                {
                    search = await _fileStorage.Search(deliveryFolder, fileName, 1);
                    _logger.LogDebug($"search: {fileName} => {search.Count}");
                }
                catch (Exception e)
                {
                    _logger.LogDebug(e.Message);
                }

                if (search != null && search.Any())
                {
                    var iData = await _fileStorage.Download(deliveryFolder, fileName);
                    _logger.LogDebug($"download: {fileName} => {iData.Length}");
                    customers.AddRange(ie.ImportCustomerForm(iData));

                    _logger.LogDebug($"import: {fileName} => {customers.ToJson()}");
                }

                customers.Add(request);
                var eData = ie.Export(customers);

                var uploadResult = await _fileStorage.Upload(deliveryFolder, fileName, eData);
                _logger.LogDebug($"upload: {fileName} => {uploadResult.ToJson()}");

                return true;
            }
        }

        public class CertificateRequestValidator : AbstractValidator<CertificateRequest>
        {
            public CertificateRequestValidator()
            {
                RuleFor(q => q.FirstName).NotEmpty();
                RuleFor(q => q.LastName).NotEmpty();
                RuleFor(q => q.Phone).NotEmpty().PhoneNumber();
                RuleFor(q => q.Email).NotEmpty().EmailAddress();
                RuleFor(q => q.Address).NotEmpty();
                RuleFor(q => q.Constructor).NotEmpty();
            }
        }
    }
}
