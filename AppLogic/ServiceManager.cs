using DataAccess.Crud;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppLogic
{
    public class ServiceManager
    {
        public List<Service>GetData()
        {
            ServiceCrud serviceCrud = new ServiceCrud();
            return serviceCrud.RetrieveAll<Service>();
        }
        public List<Service> GetServiceById(int id)
        {
            ServiceCrud serviceCrud = new ServiceCrud();
            return serviceCrud.RetrieveById<Service>(id);
        }
        public void UpdateService(Service service, int id)
        {
            ServiceCrud serviceCrud = new ServiceCrud();
            serviceCrud.UpdateService(service, id);

        }
        public void ActivateService(int id)
        {
            ServiceCrud serviceCrud = new ServiceCrud();
            serviceCrud.ActivateService(id);

        }
        public void DeactivateService(int id)
        {
            ServiceCrud serviceCrud = new ServiceCrud();
            serviceCrud.DeactivateService(id);

        }
    }
}
