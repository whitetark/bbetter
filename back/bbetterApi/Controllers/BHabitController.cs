using Microsoft.AspNetCore.Mvc;

namespace bbetterApi.Controllers
{
    public class BHabitController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
