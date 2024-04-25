using Microsoft.AspNetCore.Mvc;

namespace ProyectoFinalProyecto2.Controllers
{
    public class ServicesController : Controller
    {
        public IActionResult ServicesList()
        {
            return View();
        }

        public IActionResult ServiceModify()
        {
            return View();
        }
    }
}
