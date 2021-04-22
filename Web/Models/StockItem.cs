using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace Web.Models
{
    [JsonObject]
    public class StockItem
    {
        [JsonProperty("length")]
        public float Length { set; get; }

        [JsonProperty("count")]
        public string Count { set; get; }
    }

    public class FileImport
    {
        public IFormFile ImportExcel { get; set; }
    }
}
