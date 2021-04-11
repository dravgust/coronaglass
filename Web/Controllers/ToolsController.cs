using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using VralumGlassWeb.Data;
using Web.Models;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToolsController : ControllerBase
    {
        private readonly ILogger<ToolsController> _logger;
        private readonly IWebHostEnvironment _environment;
        private const string SFileName = @"optimization.xlsx";

        private readonly List<Clip> _clips = new()
        {
            new Clip(83, 2.625),
            new Clip(100, 2.42),
            new Clip(116, 2.677),
            new Clip(120, 2.6),
            new Clip(130, 2.935)
        };

        public ToolsController(ILogger<ToolsController> logger, IWebHostEnvironment environment)
        {
            this._logger = logger;
            this._environment = environment;
        }

        [HttpGet]
        [Route("smartcut/init")]
        public async Task<IActionResult> Init()
        {
            var response = await Task.FromResult(new SmartCutModel
            {
                Planks = new List<float> { 7000 },
                Clips = _clips
            });
            return new JsonResult(response);
        }

        [HttpPost]
        [Route("smartcut/run")]
        public async Task<IActionResult> Run(SmartCutModel request, CancellationToken token)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var cuttingStock = new CuttingStock(request.Snippets.Cast<ISnippet>().ToList());
            var purePlanks = new List<float>();
            request.Planks.ForEach(p => purePlanks.Add(p - request.PlankReserve));
            var planks = cuttingStock.CalculateCuts(purePlanks);
            var free = CuttingStock.GetFree(planks);

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
            var clip = _clips.FirstOrDefault(c => c.Id == request.Clip);

            var ie = new ImportExport();
            var data = ie.Export2(request.ProjectName, planks, free, columnSum, clip?.Weight ?? 0.0, column6300Count, columnWeight, request.PlankReserve);
            string result;
            await using (var sr = new MemoryStream())
            {
                await sr.WriteAsync(data, 0, data.Length, token);
                result = XlsxToHtmlConverter.ConvertXlsx(sr, nameof(CuttingStock));
            }

            return Ok(result);
        }

        [HttpGet]
        [Route("smartcut/export")]
        public async Task<IActionResult> Export()
        {
            var sWebRootFolder = _environment.WebRootPath;

            var file = Path.Combine(sWebRootFolder, "storage", SFileName);

            if (!System.IO.File.Exists(file))
            {
                _logger.LogInformation($"The file {file} does not exists!");
            }

            var memory = new MemoryStream();
            using (var fs = new FileStream(file, FileMode.Open))
            {
                await fs.CopyToAsync(memory);
            }
            memory.Position = 0;
            return File(memory, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", $"{nameof(CuttingStock)}.xlsx");
        }

        [HttpPost]
        [Route("smartcut/import")]
        public async Task<IActionResult> Import([FromForm] FileImport request)
        {
            var ie = new ImportExport();

            byte[] snippets;
            await using (var ms = new MemoryStream())
            {
                await request.ImportExcel.CopyToAsync(ms);
                snippets = ms.ToArray();
            }

            return new JsonResult(new { snippets = ie.ImportSnippets(snippets) });
        }
    }
}
