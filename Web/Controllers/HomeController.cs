using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Diagnostics;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Localization;
using Microsoft.Extensions.Localization;
using Web.Infrastructure;
using Web.Infrastructure.Services;
using Web.Models;
using Web.Resources;

namespace Web.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IEmailSender _emailSender;
        private readonly IStringLocalizer<HomeController> _resources;

        public HomeController(IStringLocalizer<HomeController> resources, IEmailSender emailSender, ILogger<HomeController> logger)
        {
            _logger = logger;
            _emailSender = emailSender;
            _resources = resources;
        }

        [HttpGet]
        [Route("")]
        public IActionResult Index()
        {
            return View();
        }


        [HttpPost]
        [Route("")]
        public async Task<IActionResult> ContactUsForm(ContactUsForm contactUsForm)
        {
            if (!ModelState.IsValid)
            {
                return RedirectToAction("Index");
            }

            await _emailSender.SendEmailAsync(null, contactUsForm.Subject, $"{contactUsForm.Name}\r\n{contactUsForm.Phone}\r\n{contactUsForm.Message}");

            TempData["alerts"] = new List<string> { "Message sent successfully." };

            return Redirect("~/");
        }

        [Route("/tools")]
        public IActionResult Tools()
        {
            return View();
        }

        [Route("/form")]
        public IActionResult CertificateForm()
        {
            return View();
        }

        [HttpPost]
        public IActionResult SetLanguage(string culture, string returnUrl)
        {
            Response.Cookies.Append(
                CookieRequestCultureProvider.DefaultCookieName,
                CookieRequestCultureProvider.MakeCookieValue(new RequestCulture(culture)),
                new CookieOptions { Expires = DateTimeOffset.UtcNow.AddYears(1) }
            );

            return LocalRedirect(returnUrl);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
