using DataAccess.Dao;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Mapper
{
    internal class PackageMapper
    {
        public Service BuildObject(Dictionary<string, object> objectRow)
        {
            Service service = new Service()
            {
                Id = Convert.ToInt32(objectRow["idServicio"].ToString()),
                name = objectRow["nombreServicio"].ToString(),
                //ServiceDescription = objectRow["descripcionServicio"].ToString(),
                //Price = Convert.ToDouble(objectRow["precio"].ToString()),
                //ServiceAvailable = objectRow["disponibilidadServicio"].ToString() == "True"
            };
            return service;
        }
        public List<Service> BuildObjects(List<Dictionary<string, object>> objectRows)
        {
            var lstResult = new List<Service>();

            foreach (var objRow in objectRows)
            {
                var med = BuildObject(objRow);
                lstResult.Add(med);
            }
            return lstResult;
        }

        public Package BuildPackage(Dictionary<string, object> objectRow)
        {
            Package package = new Package
            {
                PackageName = objectRow["nombrePaquete"].ToString(),
                IdPackage = int.Parse(objectRow["idPaquete"].ToString()),
                PackageDescription = objectRow["descripcionPaquete"].ToString(),
                Price = int.Parse(objectRow["precio"].ToString())
            };
            return package;
        }
        public List<Package> BuildPackages(List<Dictionary<string, object>> objectRows)
        {
            var lstResult = new List<Package>();

            foreach (var objRow in objectRows)
            {
                var package = BuildPackage(objRow);
                lstResult.Add(package);
            }
            return lstResult;
        }
        public List<Package> BuildPackagesWithServices(List<Dictionary<string, object>> dataResults)
        {
            return dataResults
             .GroupBy(d => new
             {
                 IdPaquete = Convert.ToInt32(d["idPaquete"]), // Handle potential Int64 to Int32 conversion
                 NombrePaquete = (string)d["nombrePaquete"],
                 DescripcionPaquete = (string)d["descripcionPaquete"],
                 Precio = Convert.ToDouble(d["precio"]) // Convert to double instead of decimal
             })

             .Select(group => new Package
             {
                 IdPackage = group.Key.IdPaquete,
                 PackageName = group.Key.NombrePaquete,
                 PackageDescription = group.Key.DescripcionPaquete,
                 Price = (double?)group.Key.Precio,
                 Services = group.Select(d => new Service
                 {
                     Id = Convert.ToInt32(d["idServicio"]), // Handle potential Int64 to Int32 conversion
                     name = (string)d["nombreServicio"]
                 }).ToList()
             })
             .ToList();
        }
        public SqlOperation GetCreateStatement(List<int> additionalServices, int id)
        {
            string additionalservicesids = "";
            for (int i = 0; i < additionalServices?.Count; i++)
            {
                additionalservicesids += additionalServices[i] + ",";

                if (i == additionalServices.Count - 1)
                {
                    additionalservicesids = additionalservicesids.Remove(additionalservicesids.Length - 1, 1);
                }
            }

            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "PR_ADD_SERVICE_LIST";
            operation.AddIntegerParam("idPack", id);
            operation.AddVarcharParam("aditionalServices", additionalservicesids);

            return operation;
        }
        public SqlOperation GetDeleteStatement(List<int> deletedServices, int id)
        {
            string deltedservicesids = "";
            for (int i = 0; i < deletedServices?.Count; i++)
            {
                deltedservicesids += deletedServices[i] + ",";

                if (i == deletedServices.Count - 1)
                {
                    deltedservicesids = deltedservicesids.Remove(deltedservicesids.Length - 1, 1);
                }
            }

            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "PR_DELETE_SERVICE_LIST";
            operation.AddIntegerParam("idPack", id);
            operation.AddVarcharParam("deletedServices", deltedservicesids);

            return operation;
        }
        public SqlOperation RetrieveById(int id)
        {
            SqlOperation operation = new SqlOperation();

            operation.ProcedureName = "PR_GET_PACKAGE_BY_ID";
            operation.AddIntegerParam("id", id);

            return operation;
        }
        public SqlOperation GetServices(int idPackage)
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "PR_GET_SERVICES_AVAILABLE";
            operation.AddIntegerParam("idPackage", idPackage);

            return operation;
        }

        public SqlOperation RetrieveAllStatement()
        {
            SqlOperation operation = new SqlOperation();

            operation.ProcedureName = "PR_GET_ALL_PACKAGES";


            return operation;
        }
        public SqlOperation RetrieveAllWithServiceStatement()
        {
            SqlOperation operation = new SqlOperation();

            operation.ProcedureName = "PR_GET_ALL_PACKAGES_SERVICES";


            return operation;
        }
    }
}
