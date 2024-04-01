using Microsoft.AspNetCore.Mvc;

namespace bbetterApi.Controllers
{
    public class GHabitController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
