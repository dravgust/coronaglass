using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using CoreLibrary.XLSX;
using CoronaGlass.Core;
using CoronaGlass.Core.Interfaces;
using CoronaGlass.Core.Models;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using VralumGlassWeb.Data;
using Web.Models;

namespace Web.Features.Tools
{
    [JsonObject]
    public class OptimizationRequest : IRequest<string>
    {
        [JsonProperty("clips")]
        public List<Clip> Clips { set; get; } = new()
        {
            new Clip(83, 2.625),
            new Clip(100, 2.42),
            new Clip(116, 2.677),
            new Clip(120, 2.6),
            new Clip(130, 2.935)
        };

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

        public class OptimizationRequestHandler : IRequestHandler<OptimizationRequest, string>
        {
            private readonly ILogger<OptimizationRequestHandler> _logger;
            public OptimizationRequestHandler(ILogger<OptimizationRequestHandler> logger)
            {
                _logger = logger;
            }

            public async Task<string> Handle(OptimizationRequest request, CancellationToken cancellationToken)
            {
                var cuttingStock = new CuttingStock(request.Snippets.Cast<ISnippet>().ToList());
                var purePlanks = new Stock();

                request.Planks.ForEach(p => purePlanks.Add(p.Length - request.PlankReserve, uint.TryParse(p.Count, out var count) ? count : uint.MaxValue));

                var planks = cuttingStock.CalculateFor(purePlanks);
                var free = CuttingStock.GetFree(planks.Item1);

                decimal columnSum = 0;
                foreach (var columnValue in request.Snippets.Select(s => s.Columns))
                {
                    if (!string.IsNullOrEmpty(columnValue) && int.TryParse(columnValue, out var column))
                    {
                        columnSum += column;
                    }
                }
                var column6300Count = Math.Ceiling(columnSum / 6);
                const double columnWeight = 1.861;
                var clip = request.Clips.FirstOrDefault(c => c.Id == request.Clip);

                var ie = new ImportExport();
                var data = ie.Export2(request.ProjectName, planks.Item1, planks.Item2, free, columnSum, clip?.Weight ?? 0.0, column6300Count, columnWeight, request.PlankReserve);
                await using var sr = new MemoryStream();
                await sr.WriteAsync(data, 0, data.Length, cancellationToken);
                var result = XlsxToHtmlConverter.ConvertXlsx(sr, nameof(CuttingStock));

                return result;
            }
        }

        public class OptimizationRequestValidator : AbstractValidator<OptimizationRequest>
        { 
            public OptimizationRequestValidator()
            {
                RuleFor(q => q.ProjectName).NotEmpty();
            }
        }
    }
}
