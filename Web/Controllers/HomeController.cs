using System;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Localization;
using Web.Features.Customer;
using Web.Models;

namespace Web.Controllers
{
    public class HomeController : Controller
    {
        private readonly IMediator _mediator;

        public HomeController(IMediator mediator)
        {
            this._mediator = mediator;
        }

        [HttpGet]
        [Route("")]
        public IActionResult Index()
        {
            return View();
        }


        [HttpPost]
        [Route("")]
        public async Task<IActionResult> ContactUsForm(ContactUsRequest query, CancellationToken token)
        {
            string response;
            try
            {
                response = await _mediator.Send(query, token);
            }
            catch (Exception e)
            {
               response = e.Message;
            }

            TempData["alerts"] = response;
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
