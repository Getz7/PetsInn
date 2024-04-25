using DataAccess.Dao;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Mapper
{
    internal class CreditNoteMapper
    {
        public CreditNote BuildObject(Dictionary<string, object> objectRow)
        {
            var user = new User
            {
                IdentificationNumber = int.Parse(objectRow["numeroIdentifiacion"].ToString())
            };
            var creditNote = new CreditNote
            {
                Id = int.Parse(objectRow["idNotaDeCredito"].ToString()),
                Amount = float.Parse(objectRow["montoNotaDeCredito"].ToString()),
                UserId = user
            };
            return creditNote;
        }

        internal SqlOperation GetCreditNoteByUserIdStatement(string pUserId)
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "PR_GET_CREDIT_NOTE_BY_USER_ID";
            operation.AddVarcharParam("userId", pUserId);
            return operation;
        }
    }
}
