using AppLogic;
using DTO;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class PaymentsController : Controller
    {
        [HttpPost]
        public string ConfirmPayment(Payment payment)
        {
            PaymentManager paymentManager = new PaymentManager();
            paymentManager.ConfirmPayment(payment);
            return "Pago Registrado con exito";
        }

    }
}
