namespace Web.Infrastructure.Services
{
    public class DeliveryEnvelope<TMessage>
    {
        public TMessage Message { get; }
        public long MessageId { get; }
        public DeliveryEnvelope(TMessage message, long messageId)
        {
            Message = message;
            MessageId = messageId;
        }
    }
}
