using DataAccess.Crud;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppLogic
{
    public class CouponManager
    {
        public void CreateCoupon(Coupon coupon)
        {
            CouponCrud couponCrud = new CouponCrud();
            couponCrud.CreateCoupon(coupon);

        }

        public Coupon GetCouponByCode(string pCode, string pIdUser)
        {
            CouponCrud couponCrud = new CouponCrud();
            return couponCrud.GetCouponByCode(pCode, pIdUser);
        }
    }
}
