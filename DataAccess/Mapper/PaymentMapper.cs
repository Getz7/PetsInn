using DataAccess.Dao;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace DataAccess.Mapper
{
    internal class PaymentMapper
    {
        public SqlOperation GetCreateStatement(Payment payment)
        {

            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "PR_CREATE_PAYMENT";
            operation.AddIntegerParam("reservationId", payment.Reservation?.IdReservation);
            operation.AddVarcharParam("state", "Pagado");
            operation.AddFloatParam("amount", payment.Amount);
            operation.AddIntegerParam("iva", payment.Iva);
            return operation;

        }
    }
}



