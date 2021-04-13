using Newtonsoft.Json;

namespace CoronaGlass.Core.Models
{
    [JsonObject]
    public class Clip
    {
        public Clip(int id, double weight)
        {
            Id = id;
            Weight = weight;
        }

        [JsonProperty("id")]
        public int Id { get; }

        [JsonProperty("name")]
        public string Name => $"{Id}";

        [JsonProperty("weight")]
        public double Weight { get; }
    }
}
