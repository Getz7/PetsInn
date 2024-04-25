using DataAccess.Dao;
using DataAccess.Mapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DTO;

namespace DataAccess.Crud
{
    public class ServiceCrud
    {
        private ServiceMapper _serviceMapper;
        private SqlDao dao;

        public ServiceCrud()
        {
            _serviceMapper = new ServiceMapper();
            dao = SqlDao.GetInstance();
        }
        public void UpdateService(Service service, int id)
        {
            SqlOperation operation = _serviceMapper.GetModifyStatement(service, id);
            dao.ExecuteStoredProcedure(operation);
        }
        public void ActivateService(int id)
        {
            SqlOperation operation = _serviceMapper.GetActivateStatement(id);
            dao.ExecuteStoredProcedure(operation);
        }
        public void DeactivateService(int id)
        {
            SqlOperation operation = _serviceMapper.GetDeactivateStatement(id);
            dao.ExecuteStoredProcedure(operation);
        }
        public List<T> RetrieveAll<T>()
        {
            List<T> lstResults = new List<T>();
            List<Dictionary<string, object>> dataResults = dao.ExecuteStoredProcedureWithQuery(_serviceMapper.RetrieveAllStatement());

            if (dataResults.Count > 0)
            {
                var dtoObjects = _serviceMapper.BuildObjects(dataResults);

                foreach (var objeto in dtoObjects)
                {
                    lstResults.Add((T)Convert.ChangeType(objeto, typeof(T)));
                }
            }
            return lstResults;
        }
        public List<T> RetrieveById<T>(int id)
        {
            List<T> lstResults = new List<T>();
            List<Dictionary<string, object>> dataResults = dao.ExecuteStoredProcedureWithQuery(_serviceMapper.RetrieveById(id));

            if (dataResults.Count > 0)
            {
                var dtoObjects = _serviceMapper.BuildObjects(dataResults);

                foreach (var objeto in dtoObjects)
                {
                    lstResults.Add((T)Convert.ChangeType(objeto, typeof(T)));
                }
            }
            return lstResults;
        }

        public List<Service> GetServicesByPackageId(int packageId)
        {
            List<Service> packageServices = new List<Service>();
            List<Dictionary<string, object>> dataResults = dao.ExecuteStoredProcedureWithQuery(_serviceMapper.GetServiceByPackageId(packageId));

            if (dataResults.Count > 0)
            {
                packageServices = _serviceMapper.BuildObjects(dataResults);
            }

            return packageServices;
        }
    }
}
