using CoronaGlass.Core.Interfaces;
using Newtonsoft.Json;

namespace CoronaGlass.Core.Models
{
    [JsonObject]
    public class Snippet : ISnippet
    {
        [JsonProperty("length")]
        public float Length { get; }

        public Snippet(float length)
        {
            Length = length;
        }

        public int CompareTo(ISnippet other)
        {
            return this.Length.CompareTo(other.Length);
        }

        public override string ToString()
        {
            return $"{Length}";
        }

        public virtual ISnippet Clone(float length)
        {
            return new Snippet(length);
        }
    }
}
