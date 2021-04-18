using System;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using CoreLibrary.XLSX;
using CoronaGlass.Core;
using CoronaGlass.Core.Interfaces;
using CoronaGlass.Core.Models;
using MediatR;
using Microsoft.Extensions.Logging;
using VralumGlassWeb.Data;
using Web.Infrastructure.Validators;
using Web.Models;

namespace Web.Features.Tools
{
    public class RunOptimizationQuery : SmartCutModel, IRequest<string>
    {
        public class OptimizationQueryHandler : IRequestHandler<RunOptimizationQuery, string>
        {
            private readonly ILogger<OptimizationQueryHandler> _logger;
            public OptimizationQueryHandler(ILogger<OptimizationQueryHandler> logger)
            {
                _logger = logger;
            }

            public async Task<string> Handle(RunOptimizationQuery request, CancellationToken cancellationToken)
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

        public class SmartCutModelValidator : SmartCutModelValidator<RunOptimizationQuery>
        {
        }
    }
}
