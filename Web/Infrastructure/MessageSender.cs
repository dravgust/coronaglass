using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;

namespace Web.Infrastructure
{
	public class EmailSettings
	{
		public string PrimaryDomain { get; set; }

		public int PrimaryPort { get; set; }

		public string SecondaryDomain { get; set; }

		public int SecondaryPort { get; set; }

		public string UsernameEmail { get; set; }

		public string UsernamePassword { get; set; }

		public string FromEmail { get; set; }

		public string ToEmail { get; set; }

		public string CcEmail { get; set; }
	}

    public interface IEmailSender
    {
        Task SendEmailAsync(string email, string subject, string htmlMessage, IEnumerable<Attachment> attachments = null);
    }

	public class MessageSender : IEmailSender
	{
		private EmailSettings EmailSettings { get; }

		public MessageSender(IOptions<EmailSettings> emailSettings)
		{
			EmailSettings = emailSettings.Value;
		}

		public Task SendEmailAsync(string email, string subject, string htmlMessage, IEnumerable<Attachment> attachments = null)
		{
			return Execute(email, subject, htmlMessage, attachments);
		}

		private async Task Execute(string email, string subject, string message, IEnumerable<Attachment> attachments)
		{
			try
			{
				var toEmail = string.IsNullOrEmpty(email) ? EmailSettings.ToEmail : email;

                using var mailMessage = new MailMessage
                {
                    From = new MailAddress(EmailSettings.FromEmail, "Corona Support")
                };
                mailMessage.To.Add(toEmail);
                mailMessage.Body = message;
                mailMessage.IsBodyHtml = true;
                mailMessage.Subject = subject;

                if (attachments != null)
                    foreach (var attachment in attachments)
                        mailMessage.Attachments.Add(attachment);

                using var client = new SmtpClient
                {
                    EnableSsl = true,
                    UseDefaultCredentials = false,
                    Credentials = new NetworkCredential(EmailSettings.UsernameEmail, EmailSettings.UsernamePassword),
                    Host = EmailSettings.PrimaryDomain,
                    Port = EmailSettings.PrimaryPort,
                    DeliveryMethod = SmtpDeliveryMethod.Network
                };

                await client.SendMailAsync(mailMessage);
            }
			catch (Exception e)
			{
				Trace.WriteLine($"MessageSender| {e.Message}");
			}
		}
	}
}
