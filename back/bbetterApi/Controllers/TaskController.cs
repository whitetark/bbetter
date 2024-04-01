using Microsoft.AspNetCore.Mvc;

namespace bbetterApi.Controllers
{
    public class TaskController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
