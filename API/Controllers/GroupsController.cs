using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DTO;
using AppLogic;

namespace API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class GroupsController : Controller
    {
        [HttpPost]
        public string UpdateGroup(PetGroup petGroup)
        {
            GroupManager groupManager = new GroupManager();
            groupManager.UpdatePetGroup(petGroup);

            return "Grupo actualizado con éxito";
        }
        [HttpGet]
        public PetGroup GetPetGroupById(int groupId)
        {
            GroupManager groupManager = new GroupManager();
            return groupManager.GetGroupById(groupId);

            
        }
        
    }

}
