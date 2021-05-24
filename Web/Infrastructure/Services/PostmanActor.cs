using System;
using System.Diagnostics;
using System.Threading.Tasks;
using Akka.Actor;


namespace Web.Infrastructure.Services
{
    public class PostmanActor : ReceiveActor
    {
        private readonly IEmailSender _emailSender;

        public PostmanActor(IEmailSender emailSender)
        {
            _emailSender = emailSender ?? throw new NullReferenceException(nameof(emailSender));

            Receive<DeliveryEnvelope<PostMessage>>(cmd =>
            {
                var sender = Sender;
                Trace.WriteLine($"Received message for { cmd.Message.Email} [id: {cmd.MessageId}] from {sender}");
                Send(cmd).PipeTo(sender);
            });
        }

        public async Task<DeliveryAck> Send(DeliveryEnvelope<PostMessage> cmd)
        {
            var email = cmd.Message.Email;
            var subject = cmd.Message.Subject;
            var body = cmd.Message.Body;
            var attachments = cmd.Message.Attachments;

            await _emailSender.SendEmailAsync(email, subject, body, attachments);

            return new DeliveryAck(cmd.MessageId);
        }
    }
}
