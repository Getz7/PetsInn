using AppLogic;
using DTO;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [EnableCors("MyCorsPolicy")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CreditNoteController
    {
        [HttpGet]
        public CreditNote GetCreditNoteByUserId(string pUserId)
        {
            CreditNoteManager creditNoteManager = new CreditNoteManager();
            return creditNoteManager.GetCreditNoteByUserId(pUserId);
        }
    }
}
