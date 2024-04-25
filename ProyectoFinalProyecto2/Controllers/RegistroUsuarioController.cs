using Microsoft.AspNetCore.Mvc;

namespace ProyectoFinalProyecto2.Controllers
{
    public class RegistroUsuarioController : Controller
    {
        public IActionResult RegistroUsuario()
        {
            return View();
        }

        public IActionResult Login()
        {
            return View("~/Views/Login/Login.cshtml");
        }
    }
}
