using DataAccess.Crud;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppLogic
{
    public class CreditNoteManager
    {
        public CreditNote GetCreditNoteByUserId (string pUserId)
        {
            CreditNoteCrud creditNoteCrud = new CreditNoteCrud();
            return creditNoteCrud.GetCreditNoteByUserId(pUserId);
        }
    }
}
