using System;
using System.Collections.Generic;
using System.Net.Mail;

namespace Web.Infrastructure
{
    public class SendMessageCommand
    {
        public string Email { get; }
        public string Subject { get; }
        public string Body { get; }
        public List<Attachment> Attachments { get; } = new();
        public SendMessageCommand(string email, string subject, string body)
        {
            if(string.IsNullOrEmpty(email))
                throw new ArgumentNullException(nameof(email));
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
