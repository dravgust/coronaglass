using System.Collections.Generic;
using System.Net.Mail;

namespace Web.Infrastructure.Services
{
    public class PostMessage
    {
        public string Email { get; }
        public string Subject { get; }
        public string Body { get; }
        public List<Attachment> Attachments { get; } = new();
        public PostMessage(string email, string subject, string body)
        {
            Email = email;
            Subject = subject;
            Body = body;
        }

        public void AddAttachment(Attachment attachment)
        {
            Attachments.Add(attachment);
        }
    }
}
