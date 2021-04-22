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
using MediatR;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using VralumGlassWeb.Data;
using Web.Features.Tools;
using Web.Models;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToolsController : ControllerBase
    {
        private readonly ILogger<ToolsController> _logger;
        private readonly IWebHostEnvironment _environment;
        private readonly IMediator _mediator;
        private const string SFileName = @"optimization.xlsx";

        public ToolsController(ILogger<ToolsController> logger, IWebHostEnvironment environment, IMediator mediator)
        {
            this._logger = logger;
            this._environment = environment;
            this._mediator = mediator;
        }

        [HttpGet]
        [Route("smartcut/init")]
        public async Task<IActionResult> Init()
        {
            var response = await Task.FromResult(new OptimizationRequest
            {
                Planks = new List<StockItem> { new() { Length = 7000 } }
            });
            return new JsonResult(response);
        }

        [HttpPost]
        [Route("smartcut/run")]
        public async Task<IActionResult> Run(OptimizationRequest request, CancellationToken token)
        {
            //if (!ModelState.IsValid)
            //    return BadRequest(ModelState);

            return Ok(await _mediator.Send(request, token));
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
        [Route("smartcut/import/snippets")]
        public async Task<IActionResult> ImportSnippets([FromForm] FileImport request)
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

        [HttpPost]
        [Route("smartcut/import/planks")]
        public async Task<IActionResult> ImportPlanks([FromForm] FileImport request)
        {
            var ie = new ImportExport();

            byte[] planks;
            await using (var ms = new MemoryStream())
            {
                await request.ImportExcel.CopyToAsync(ms);
                planks = ms.ToArray();
            }

            return new JsonResult(new { planks = ie.ImportStock(planks) });
        }
    }
}
