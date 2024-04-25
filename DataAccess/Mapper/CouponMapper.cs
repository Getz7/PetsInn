using DataAccess.Dao;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Mapper
{
    public class CouponMapper
    {

        public Coupon BuildObject(Dictionary<string, object> objectRow)
        {
            var coupon = new Coupon
            {
                CouponCode = objectRow["codigoCupon"].ToString(),
                amountCoupon = float.Parse(objectRow["montoCupon"].ToString()),
                initialDate = DateTime.Parse(objectRow["fechaInicio"].ToString()),
                finalDate = DateTime.Parse(objectRow["fechaFinalizacion"].ToString())

            };
            return coupon;
        }

        public SqlOperation GetCreateStatement(Coupon coupon)
        {

            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "PR_CREATE_COUPON";
            operation.AddVarcharParam("CouponCode", coupon.CouponCode);
            operation.AddFloatParam("amountCoupon", coupon.amountCoupon);
            operation.AddDateTimeParam("initialDate", coupon.initialDate);
            operation.AddDateTimeParam("finalDate", coupon.finalDate);


            return operation;
        }

        internal SqlOperation GetCouponByCodeStatement(string pCode, string pIdUser)
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "PR_GET_COUPON_BY_CODE";
            operation.AddVarcharParam("code", pCode);
            operation.AddVarcharParam("userId", pIdUser);
            return operation;
        }
    }
}
