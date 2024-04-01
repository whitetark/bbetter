using Microsoft.AspNetCore.Mvc;

namespace bbetterApi.Controllers
{
    public class WishController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
