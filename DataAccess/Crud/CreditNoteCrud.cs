using DataAccess.Dao;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DTO;
using DataAccess.Mapper;

namespace DataAccess.Crud
{
    public class CreditNoteCrud
    {
        private CreditNoteMapper _creditNoteMapper;
        protected SqlDao dao;

        public CreditNoteCrud()
        {
            _creditNoteMapper = new CreditNoteMapper();
            dao = SqlDao.GetInstance();
        }

        public CreditNote GetCreditNoteByUserId(string pUserId)
        {
            SqlOperation operation = _creditNoteMapper.GetCreditNoteByUserIdStatement(pUserId);
            List<Dictionary<string, object>> result = dao.ExecuteStoredProcedureWithQuery(operation);
            CreditNote creditNote = null;
            if (result.Count > 0)
            {
                creditNote = _creditNoteMapper.BuildObject(result[0]);
            }
            return creditNote;

        }
    }
}
