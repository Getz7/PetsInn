using DTO;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;
using System.Text;

namespace ProyectoFinalProyecto2.Controllers
{
    public class LoginController : Controller
    {
        public IActionResult Login()
        {
            return View();
        }

        public IActionResult RecuperarContrasena()
        {
            return View("~/Views/RecuperarContrasena/RecuperarContrasena.cshtml");
        }


    }
}
