using Microsoft.AspNetCore.Mvc;

namespace ProyectoFinalProyecto2.Controllers
{
    public class HomeController:Controller
    {
        public IActionResult Home()
        {
            return View();
        }
        public IActionResult Login()
        {
            return View("~/Views/Login/Login.cshtml");
        }
        public IActionResult RegistroUsuario()
        {
            return View("~/Views/RegistroUsuario/RegistroUsuario.cshtml");
        }
    }
}
