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
    public class PaymentCrud
    {
        private PaymentMapper _paymentMapper;
        private SqlDao dao;
        public PaymentCrud()
        {
            _paymentMapper = new PaymentMapper();
            dao = SqlDao.GetInstance();
        }
        public void Create(Payment payment)
        {
            SqlOperation operation = _paymentMapper.GetCreateStatement(payment);
            dao.ExecuteStoredProcedure(operation);

        }
    }
}
