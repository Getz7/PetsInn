using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DataAccess.Crud;
using System.Threading.Tasks;

namespace AppLogic
{
    public class PaymentManager
    {
        public void ConfirmPayment(Payment payment)
        {
            PaymentCrud paymentCrud = new PaymentCrud();
            paymentCrud.Create(payment);

        }
    }
}
