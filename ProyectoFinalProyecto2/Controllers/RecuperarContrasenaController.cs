using Microsoft.AspNetCore.Mvc;

namespace ProyectoFinalProyecto2.Controllers
{
    public class RecuperarContrasenaController : Controller
    {
        public IActionResult RecuperarContrasena()
        {
            return View();
        }

        public IActionResult Login()
        {
            return View("~/Views/Login/Login.cshtml");
        }
    }
}
