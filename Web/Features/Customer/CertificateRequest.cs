using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Net.Mime;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Akka.Actor;
using CoronaGlass.Core;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Web.Extensions;
using Web.Features.Tools;
using Web.Infrastructure;
using Web.Models;

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
        [JsonProperty("street")]
        public string Street { set; get; }
        [JsonProperty("floor")]
        public string Floor { set; get; }
        [JsonProperty("apartment")]
        public string Apartment { set; get; }
        [JsonProperty("city")]
        public string City { set; get; }
        [JsonProperty("projectName")]
        public string ProjectName { set; get; }
        [JsonProperty("constructorName")]
        public string ConstructorName { set; get; }
        [JsonProperty("keyReceived")]
        public DateTime KeyReceived { set; get; }

        public class CertificateRequestHandler : IRequestHandler<CertificateRequest, bool>
        {
            private readonly ILogger<CertificateRequestHandler> _logger;
            private readonly IFileStorage _fileStorage;

            private readonly IActorRef _postman;
            public CertificateRequestHandler(IFileStorage fileStorage, ILogger<CertificateRequestHandler> logger, PostmanActorProvider postmanProvider)
            {
                _fileStorage = fileStorage;
                _logger = logger;
                _postman = postmanProvider();
            }

            public async Task<bool> Handle(CertificateRequest request, CancellationToken cancellationToken)
            {
                var cmd = new SendMessageCommand(request.Email, "תעודת אחריות", "תעודת אחריות");
                var contentType = new ContentType
                {
                    MediaType = MediaTypeNames.Application.Pdf,
                    Name = "WarrantyCert.pdf"
                };
                cmd.AddAttachment(new Attachment("Files/Certificate.pdf", contentType));
                _postman.Tell(cmd);

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
                RuleFor(q => q.Street).NotEmpty();
                RuleFor(q => q.City).NotEmpty();
                RuleFor(q => q.Floor).NotEmpty();
                RuleFor(q => q.Apartment).NotEmpty();
                RuleFor(q => q.ConstructorName).NotEmpty();
            }
        }
    }
}
