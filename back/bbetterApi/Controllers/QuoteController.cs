using Microsoft.AspNetCore.Mvc;

namespace bbetterApi.Controllers
{
    public class QuoteController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
