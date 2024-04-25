using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using AppLogic;
using DTO;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
namespace API.Controllers
{
    [EnableCors("MyCorsPolicy")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CouponController
    {
        [HttpPost]
        public string CreateCoupon(Coupon coupon)
        {
            CouponManager couponManager = new CouponManager();
            couponManager.CreateCoupon(coupon);


            return "Cupon registrado con éxito";
        }
        [HttpGet]
        public Coupon GetCouponByCode(string pCode, string pIdUser)
        {
            CouponManager couponManager = new CouponManager();
            return couponManager.GetCouponByCode(pCode, pIdUser);
        }
    }
}
