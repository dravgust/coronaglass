using System;
using System.Collections.Generic;
using System.Net.Mail;
using System.Net.Mime;
using System.Threading;
using System.Threading.Tasks;
using Akka.Actor;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Web.Extensions;
using Web.Infrastructure;
using Web.Infrastructure.Services;

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
            private readonly SharedLocalizationService _resources;

            private readonly IActor<EmailGateway> _postOffice;
            private readonly IActor<CustomerStorageActor> _customerStorage;
            public CertificateRequestHandler(ILogger<CertificateRequestHandler> logger,
                IActor<EmailGateway> postOfficeActor, IActor<CustomerStorageActor> customerStorage,
                SharedLocalizationService resources)
            {
                _logger = logger;
                _postOffice = postOfficeActor;
                _customerStorage = customerStorage;
                _resources = resources;
            }

            public async Task<bool> Handle(CertificateRequest request, CancellationToken cancellationToken)
            {
                var contentType = new ContentType
                {
                    MediaType = MediaTypeNames.Application.Pdf,
                    Name = "WarrantyCert.pdf"
                };
                var attachments = new List<Attachment> {new("Files/Certificate.pdf", contentType)};
                var cmd = new PostMessage(request.Email, _resources["Warranty certificate"], _resources["Warranty certificate"], attachments);

                _postOffice.Ref.Tell(cmd);

                _customerStorage.Ref.Tell(request);
                
                return await Task.FromResult(true);
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
