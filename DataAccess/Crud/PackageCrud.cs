using DataAccess.Dao;
using DataAccess.Mapper;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Crud
{
    public class PackageCrud
    {
        private PackageMapper _packageMapper;
        private SqlDao dao;
        public PackageCrud()
        {
            _packageMapper = new PackageMapper();
            dao = SqlDao.GetInstance();
        }
        public void AddService(List<int> additionalServices, int id)
        {
            SqlOperation operation = _packageMapper.GetCreateStatement(additionalServices, id);
            dao.ExecuteStoredProcedure(operation);
        }
        public void DeleteService(List<int> deletedServices, int id)
        {
            SqlOperation operation = _packageMapper.GetDeleteStatement(deletedServices, id);
            dao.ExecuteStoredProcedure(operation);
        }
        public List<T> RetrieveAll<T>()
        {
            List<T> lstResults = new List<T>();
            List<Dictionary<string, object>> dataResults = dao.ExecuteStoredProcedureWithQuery(_packageMapper.RetrieveAllStatement());

            if (dataResults.Count > 0)
            {
                var dtoObjects = _packageMapper.BuildPackages(dataResults);

                foreach (var objeto in dtoObjects)
                {
                    lstResults.Add((T)Convert.ChangeType(objeto, typeof(T)));
                }
            }
            return lstResults;
        }
        public List<T> RetrievePackagesWithServices<T>()
        {
            List<T> lstResults = new List<T>();
            List<Dictionary<string, object>> dataResults = dao.ExecuteStoredProcedureWithQuery(_packageMapper.RetrieveAllWithServiceStatement());

            if (dataResults.Count > 0)
            {
                var dtoObjects = _packageMapper.BuildPackagesWithServices(dataResults);

                foreach (var objeto in dtoObjects)
                {
                    lstResults.Add((T)Convert.ChangeType(objeto, typeof(T)));
                }
            }
            return lstResults;
        }
        public List<Service> GetServices(int idPackage)
        {
            List<Service> lstResults = new List<Service>();
            List<Dictionary<string, object>> dataResults = dao.ExecuteStoredProcedureWithQuery(_packageMapper.GetServices(idPackage));

            if (dataResults.Count > 0)
            {
                var dtoObjects = _packageMapper.BuildObjects(dataResults);

                foreach (var objeto in dtoObjects)
                {
                    lstResults.Add((Service)Convert.ChangeType(objeto, typeof(Service)));
                }
            }
            return lstResults;
        }
        public List<T> RetrieveById<T>(int id)
        {
            List<T> lstResults = new List<T>();
            List<Dictionary<string, object>> dataResults = dao.ExecuteStoredProcedureWithQuery(_packageMapper.RetrieveById(id));

            if (dataResults.Count > 0)
            {
                var dtoObjects = _packageMapper.BuildPackages(dataResults);

                foreach (var objeto in dtoObjects)
                {
                    lstResults.Add((T)Convert.ChangeType(objeto, typeof(T)));
                }
            }
            return lstResults;
        }

    }
}
