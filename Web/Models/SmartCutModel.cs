﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using CoronaGlass.Core.Models;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace Web.Models
{
    [JsonObject]
    public class SmartCutModel
    {
        [JsonProperty("clips")]
        public List<Clip> Clips { set; get; }

        [JsonProperty("clip")]
        public int Clip { set; get; }

        [Range(0, 100, ErrorMessage = "* Отступ должен быть в промежутке от 0 до 100.")]
        [JsonProperty("plankReserve")]
        public int PlankReserve { set; get; } = 50;

        [Required(ErrorMessage = "* Поле является обязательным.")]
        [JsonProperty("projectName")]
        public string ProjectName { set; get; }

        [JsonProperty("planks")]
        public List<StockItem> Planks { get; set; } = new();

        [JsonProperty("snippets")]
        public List<CoronaSnippet> Snippets { get; set; } = new() { new CoronaSnippet(7000) };

    }

    [JsonObject]
    public class StockItem
    {
        [JsonProperty("length")]
        public float Length { set; get; }

        [JsonProperty("count")]
        public uint Count { set; get; }
    }

    public class FileImport
    {
        public IFormFile ImportExcel { get; set; }
    }
}
