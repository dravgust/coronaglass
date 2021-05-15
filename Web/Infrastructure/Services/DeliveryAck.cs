namespace Web.Infrastructure.Services
{
    public class DeliveryAck
    {
        public long MessageId { get; }
        public DeliveryAck(long messageId)
        {
            MessageId = messageId;
        }
    }
}
