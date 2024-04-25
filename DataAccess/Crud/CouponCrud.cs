using DataAccess.Dao;
using DataAccess.Mapper;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Crud
{
    public class CouponCrud
    {
        private CouponMapper _couponMapper;
        protected SqlDao dao;

        //Inicializo el objeto con un mapper y un dao.
        public CouponCrud()
        {
            _couponMapper = new CouponMapper();
            dao = SqlDao.GetInstance();
        }

        public void CreateCoupon(Coupon coupon)
        {
            SqlOperation operation = _couponMapper.GetCreateStatement(coupon);
            dao.ExecuteStoredProcedure(operation);

        }

        public Coupon GetCouponByCode(string pCode, string pIdUser)
        {
            SqlOperation operation = _couponMapper.GetCouponByCodeStatement(pCode, pIdUser);
            List<Dictionary<string, object>> result = dao.ExecuteStoredProcedureWithQuery(operation);
            Coupon coupon = null;
            if (result.Count > 0)
            {
                coupon = _couponMapper.BuildObject(result[0]);
            }
            return coupon;
        }
    }
}
