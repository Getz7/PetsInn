using Microsoft.AspNetCore.Mvc;

namespace ProyectoFinalProyecto2.Controllers
{
    public class PaymentClientController : Controller
    {
        public IActionResult PaymentBill()
        {
            return View();
        }
    }
}
