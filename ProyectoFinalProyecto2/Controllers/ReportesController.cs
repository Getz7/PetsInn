using Microsoft.AspNetCore.Mvc;

namespace ProyectoFinalProyecto2.Controllers
{
    public class ReportesController : Controller
    {
        public IActionResult Reportes()
        {
            return View();
        }
        public IActionResult RegisterPet()
        {
            return View("~/Views/Pets/RegisterPet.cshtml");
        }
        public IActionResult ServicesList()
        {
            return View("~/Views/Services/ServicesList.cshtml");
        }
        public IActionResult Reservaciones()
        {
            return View("~/Views/Reservaciones/Reservaciones.cshtml");
        }

        /*Added*/

        public IActionResult ClientsList()
        {
            return View("~/Views/Admin/UsersList.cshtml");
        }

        public IActionResult PetsList()
        {
            return View("~/Views/Pets/PetsList.cshtml");
        }

        public IActionResult RegisterReservation()
        {
            return View("~/Views/RegistroReserva/RegistroReserva.cshtml");
        }

        public IActionResult AsignBoardPet()
        {
            return View("~/Views/Pets/AsignBoardPet.cshtml");
        }

        public IActionResult HomePage()
        {
            return View("~/Views/Home/Home.cshtml");
        }

    }
}
