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
    public class PetCrud
    {
        private PetMapper _petMapper;
        private SqlDao dao;
        public PetCrud()
        {
            _petMapper = new PetMapper();
            dao = SqlDao.GetInstance();
        }
        public void Create(Pet pet)
        {
            SqlOperation operation = _petMapper.GetCreateStatement(pet);
            dao.ExecuteStoredProcedure(operation);

        }
        public List<T> RetrievePetsListById<T>(int id)
        {
            List<T> lstResults = new List<T>();
            List<Dictionary<string, object>> dataResults = dao.ExecuteStoredProcedureWithQuery(_petMapper.RetrievePetsListById(id));

            if (dataResults.Count > 0)
            {
                var dtoObjects = _petMapper.BuildObjects(dataResults);

                foreach (var objeto in dtoObjects)
                {
                    lstResults.Add((T)Convert.ChangeType(objeto, typeof(T)));
                }
            }
            return lstResults;
        }
        public List<Pet> RetrievePetsForSelect<Pet>()
        {
            List<Pet> lstResults = new List<Pet>();
            List<Dictionary<string, object>> dataResults = dao.ExecuteStoredProcedureWithQuery(_petMapper.RetrievePetsForSelect());

            if (dataResults.Count > 0)
            {
                var dtoObjects = _petMapper.BuildObjects(dataResults);

                foreach (var objeto in dtoObjects)
                {
                    lstResults.Add((Pet)Convert.ChangeType(objeto, typeof(Pet)));
                }
            }
            return lstResults;
        }
    }
}
