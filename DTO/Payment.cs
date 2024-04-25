using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class Payment
    {

        public int? IdPayment { get; set; }
        public string? State { get; set; }
        public float? Amount { get; set; }
        public int? Iva { get; set; }
        public Reservation? Reservation { get; set; }

    }
}
