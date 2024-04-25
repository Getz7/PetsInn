using Microsoft.AspNetCore.Mvc;
using DTO;

namespace ProyectoFinalProyecto2.Controllers
{
    public class AdminController : Controller
    {
        public IActionResult UsersList()
        {
            return View();
        }

        public IActionResult UserModify(User id)
        {
            return View();
        }
        public IActionResult PetsList()
        {
            return View();
        }
    }
}
