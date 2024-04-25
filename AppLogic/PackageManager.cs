using DataAccess.Crud;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppLogic
{
    public class PackageManager
    {
        public List<Package> GetData()
        {
            PackageCrud packageCrud = new PackageCrud();
            return packageCrud.RetrieveAll<Package>();
        }
        public List<Package> GetDataWithServices()
        {
            PackageCrud packageCrud = new PackageCrud();
            return packageCrud.RetrievePackagesWithServices<Package>();
        }
        public void AddService(List<int> additionalServices, int id)
        {
            PackageCrud packageCrud = new PackageCrud();
            packageCrud.AddService(additionalServices, id);
        }
        public void DeleteService(List<int> deletedServices, int id)
        {
            PackageCrud packageCrud = new PackageCrud();
            packageCrud.DeleteService(deletedServices, id);
        }
        public List<Package> GetPackageById(int id)
        {
            PackageCrud packageCrud = new PackageCrud();
            return packageCrud.RetrieveById<Package>(id);
        }
        public List<Service> GetServices(int idPackage)
        {
            PackageCrud packageCrud = new PackageCrud();
            return packageCrud.GetServices(idPackage);
        }


    }
}
