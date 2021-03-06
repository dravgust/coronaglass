using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace Web.Models
{
    public class CustomerDefect
    {
        [Required]
        public string CustomerId { get; set; }

        [Required]
        [Display(Name = "Description")]
        public string Description { get; set; }

        [Required]
        [Display(Name = "Photo")]
        public IFormFile UploadPhoto { get; set; }
    }
}
