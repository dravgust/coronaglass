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

            Receive<DeliveryEnvelope<PostMessage>>(async cmd => await Send(cmd, Sender));
        }

        public async Task Send(DeliveryEnvelope<PostMessage> cmd, IActorRef sender)
        {
            try
            {
                Trace.WriteLine($"Received message for { cmd.Message.Email} [id: {cmd.MessageId}] from {sender}");

                var email = cmd.Message.Email;
                var subject = cmd.Message.Subject;
                var body = cmd.Message.Body;
                var attachments = cmd.Message.Attachments;

                await _emailSender.SendEmailAsync(email, subject, body, attachments);

                sender.Tell(new DeliveryAck(cmd.MessageId));
            }
            catch (Exception e)
            {
                Trace.WriteLine(e);
            }
        }
    }
}
