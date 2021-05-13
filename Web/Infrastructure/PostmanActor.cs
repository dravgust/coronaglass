using System;
using System.Threading.Tasks;
using Akka.Actor;

namespace Web.Infrastructure
{
    public delegate IActorRef PostmanActorProvider();
    public class PostmanActor : ReceiveActor
    {
        private readonly IEmailSender _emailSender;

        public PostmanActor(IEmailSender emailSender)
        {
            _emailSender = emailSender ?? throw new NullReferenceException(nameof(emailSender));

            Receive<SendMessageCommand>(async cmd => await Send(cmd));
        }

        public async Task Send(SendMessageCommand cmd)
        {
            var email = cmd.Email;
            var subject = cmd.Subject;
            var body = cmd.Body;
            var attachments = cmd.Attachments;

            await _emailSender.SendEmailAsync(email, subject, body, attachments);
        }
    }
}
