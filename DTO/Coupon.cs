using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class Coupon
    {
        public string? CouponCode { get; set; }
        public float? amountCoupon { get; set; }
        public DateTime? initialDate { get; set; }
        public DateTime? finalDate { get; set; }


    }
}
