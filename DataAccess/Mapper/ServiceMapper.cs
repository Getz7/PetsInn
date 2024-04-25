using DataAccess.Dao;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Mapper
{
    public class ServiceMapper
    {
        public Service BuildObject(Dictionary<string, object> objectRow)
        {
            var service = new Service
            {
                Id  = int.Parse(objectRow["idServicio"].ToString()),
                name = objectRow["nombreServicio"].ToString(),
                description = objectRow["descripcionServicio"].ToString(),
                price = float.Parse(objectRow["precio"].ToString()),
                available = objectRow["disponibilidadServicio"].ToString() == "True"
            };
            return service;
        }
        public List<Service> BuildObjects(List<Dictionary<string, object>> objectRows)
        {
            var lstResult = new List<Service>();

            foreach (var objRow in objectRows)
            {
                var service = BuildObject(objRow);
                lstResult.Add(service);
            }
            return lstResult;
        }
        public SqlOperation RetrieveAllStatement()
        {
            SqlOperation operation = new SqlOperation();

            operation.ProcedureName = "PR_GET_ALL_SERVICES";


            return operation;
        }
        public SqlOperation RetrieveById(int id)
        {
            SqlOperation operation = new SqlOperation();

            operation.ProcedureName = "PR_GET_SERVICE_BY_ID";
            operation.AddIntegerParam("id", id);

            return operation;
        }
        public SqlOperation GetModifyStatement(Service service, int id)
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "PR_MODIFY_SERVICE";
            operation.AddIntegerParam("id", id);
            operation.AddVarcharParam("name",service.name);
            operation.AddVarcharParam("descripcion", service.description);
            operation.AddFloatParam("precio", service.price);
            return operation;
        }
        public SqlOperation GetActivateStatement(int id)
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "PR_ACTIVATE_SERVICE";
            operation.AddIntegerParam("id", id);
            return operation;
        }
        public SqlOperation GetDeactivateStatement(int id)
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "PR_DEACTIVATE_SERVICE";
            operation.AddIntegerParam("id", id);
            return operation;
        }

        internal SqlOperation GetServiceByPackageId(int packageId)
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "PR_GET_PACKAGE_SERVICES";
            operation.AddIntegerParam("packageId", packageId);
            return operation;
        }
    }
}
