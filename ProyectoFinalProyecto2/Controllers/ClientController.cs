using Microsoft.AspNetCore.Mvc;

namespace ProyectoFinalProyecto2.Controllers
{
    public class ClientController : Controller
    {
        public IActionResult ClientHomePage()
        {
            return View();
        }

        public IActionResult PaymentBill()
        {
            return View();
        }

        public IActionResult RegistrarMascota()
        {
            return View("~/Views/Pets/PetClientRegister.cshtml");
        }
        public IActionResult ReservationHistory()
        {
            return View("~/Views/HistorialReservas/HistorialReservas");
        }
        public IActionResult RegisterReservation()
        {
            return View();
        }

        public IActionResult PaymentConfirm()
        {
            return View();
        }
    }
}
