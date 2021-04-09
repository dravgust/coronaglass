using CoronaGlass.Core.Interfaces;
using Newtonsoft.Json;

namespace CoronaGlass.Core.Models
{
    [JsonObject]
    public class CoronaSnippet : Snippet
    {
        public CoronaSnippet(float length) : base(length)
        {

        }

        [JsonProperty("apartment")]
        public string Apartment { get; set; }

        [JsonProperty("floor")]
        public string Floor { get; set; }

        [JsonProperty("columns")]
        public string Columns { get; set; }

        public override string ToString()
        {
            return $"{Length}[{Floor}/{Apartment}]";
        }

        public override ISnippet Clone(float length)
        {
            return new CoronaSnippet(length)
            {
                Apartment = Apartment,
                Floor = Floor,
                Columns = Columns
            };
        }
    }
}
