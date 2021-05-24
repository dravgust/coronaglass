using System.Collections.Generic;
using System.Net.Mail;

namespace Web.Infrastructure.Services
{
    public class PostMessage
    {
        public string Email { get; }
        public string Subject { get; }
        public string Body { get; }
        public IReadOnlyList<Attachment> Attachments { get; }
        public PostMessage(string email, string subject, string body, IReadOnlyList<Attachment> attachments = null)
        {
            Email = email;
            Subject = subject;
            Body = body;
            Attachments = attachments ?? new List<Attachment>();
        }
    }
}
