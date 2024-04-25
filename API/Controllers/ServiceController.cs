using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using AppLogic;
using DTO;
using Microsoft.AspNetCore.Identity;


namespace API.Controllers
{
    [EnableCors("MyCorsPolicy")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ServiceController : ControllerBase
    {
        [HttpGet]
        public List<Service> GetData()
        {
            ServiceManager serviceManager = new ServiceManager();
            return serviceManager.GetData();
        }
        [HttpGet]
        public List<Service> GetServicebyId(int id)
        {
            ServiceManager serviceManager = new ServiceManager();
            return serviceManager.GetServiceById(id);
        }
        [HttpPost]
        public string UpdateService(Service service, int id)
        {

            ServiceManager serviceManager = new ServiceManager();
            serviceManager.UpdateService(service, id);

            return "Modificado con exito";

        }
        [HttpPost]
        public string ActivateService(int id)
        {

            ServiceManager serviceManager = new ServiceManager();
            serviceManager.ActivateService( id);

            return "Modificado con exito";

        }
        [HttpPost]
        public string DeactivateService(int id)
        {

            ServiceManager serviceManager = new ServiceManager();
            serviceManager.DeactivateService(id);

            return "Modificado con exito";

        }
    }
}
