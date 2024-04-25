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
    public class GroupController
    {
        [HttpGet]
        public List<PetGroup> GetData()
        {
            PetGroupManager petGroupManager = new PetGroupManager();
            return petGroupManager.GetData();
        }
       
        [HttpPost]
        public string AsignPetGroup(int idCliente, int idMascota,int idGroup)
        {
            PetGroupManager petGroupManager = new PetGroupManager();
            petGroupManager.AsignPetGroup(idCliente, idMascota, idGroup);
            
            return "Data received successfully.";
        }
    }
}
