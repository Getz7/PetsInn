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
    public class PackageController:ControllerBase
    {
       

        [HttpGet]
        public List<Package>GetData()
        {
            PackageManager packageManager = new PackageManager();
            return packageManager.GetData();
        }
        [HttpGet]
        public List<Package> GetDataWithServices()
        {
            PackageManager packageManager = new PackageManager();
            return packageManager.GetDataWithServices();
        }
        [HttpPost]
        public string AddService([FromBody] List<int> additionalServices, int id)
        {
            PackageManager packageManager = new PackageManager();
            packageManager.AddService(additionalServices, id);

            return "Services inserted successfully";
        }
        [HttpPost]
        public string DeleteService([FromBody] List<int> deletedServices, int id)
        {
            PackageManager packageManager = new PackageManager();
            packageManager.DeleteService(deletedServices, id);

            return "Services inserted successfully";
        }
        [HttpGet]
        public List<Package> GetPackageById(int id)
        {
            PackageManager packageManager = new PackageManager();
            return packageManager.GetPackageById(id);
        }
        [HttpGet]
        public List<Service>GetServices(int idPackage)
        {

            PackageManager packageManager = new PackageManager();
            return packageManager.GetServices(idPackage); ;
        }

    }
}
