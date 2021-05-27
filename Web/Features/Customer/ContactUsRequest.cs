using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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
using Web.Infrastructure.Services;
using Web.Models;

namespace Web.Features.Customer
{
    [JsonObject]
    public class ContactUsRequest : IRequest<string>
    {
        [Required, Display(Name = "Name"), StringLength(20)]
        public string Name { get; set; }

        [Required, Display(Name = "Phone"), StringLength(20)]
        public string Phone { get; set; }

        [Required, Display(Name = "Subject"), StringLength(128)]
        public string Subject { get; set; }

        [Required, Display(Name = "Message"), StringLength(500)]
        public string Message { get; set; }

        public class CertificateRequestHandler : IRequestHandler<ContactUsRequest, string>
        {
            private readonly ILogger<CertificateRequestHandler> _logger;
            private readonly SharedLocalizationService _resources;

            private readonly IActor<EmailGateway> _emailSender;
            public CertificateRequestHandler(ILogger<CertificateRequestHandler> logger,
                IActor<EmailGateway> postOfficeActor, SharedLocalizationService resources)
            {
                _logger = logger;
                _emailSender = postOfficeActor;
                _resources = resources;
            }

            public async Task<string> Handle(ContactUsRequest request, CancellationToken cancellationToken)
            {
                var cmd = new PostMessage(null, request.Subject, $"{request.Name}\r\n{request.Phone}\r\n{request.Message}");
                
                _emailSender.Ref.Tell(cmd);

                return await Task.FromResult("Message sent successfully.");
            }
        }

        public class ContactUsRequestValidator : AbstractValidator<ContactUsRequest>
        {
            public ContactUsRequestValidator()
            {
                RuleFor(q => q.Name).NotEmpty().MaximumLength(50);
                RuleFor(q => q.Phone).NotEmpty().MaximumLength(50).PhoneNumber();
                RuleFor(q => q.Subject).NotEmpty().MaximumLength(128);
                RuleFor(q => q.Message).NotEmpty().MaximumLength(500);
            }
        }
    }
}
