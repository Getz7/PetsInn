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
    public class PetGroupCrud
    {
        private PetGroupMapper _petGroupMapper;
        private SqlDao dao;
        public PetGroupCrud()
        {
            _petGroupMapper = new PetGroupMapper();
            dao = SqlDao.GetInstance();
        }
        public List<T> RetrieveAll<T>()
        {
            List<T> lstResults = new List<T>();
            List<Dictionary<string, object>> dataResults = dao.ExecuteStoredProcedureWithQuery(_petGroupMapper.RetrieveAllStatement());

            if (dataResults.Count > 0)
            {
                var dtoObjects = _petGroupMapper.BuildObjects(dataResults);

                foreach (var objeto in dtoObjects)
                {
                    lstResults.Add((T)Convert.ChangeType(objeto, typeof(T)));
                }
            }
            return lstResults;
        }
        public void AsignPetGroup(int idCliente, int idMascota, int idGroup)
        {
            SqlOperation operation = _petGroupMapper.GetAsignStatement(idCliente, idMascota,idGroup);
            dao.ExecuteStoredProcedure(operation);
        }
        public PetGroup GetGroupById(int groupId)
        {
            SqlOperation operation = _petGroupMapper.GetGroupByIdStatement(groupId);
            List<Dictionary<string, object>> result = dao.ExecuteStoredProcedureWithQuery(operation);
            PetGroup petGroup = null;
            if (result.Count > 0)
            {
                petGroup = _petGroupMapper.BuildObject(result[0]);
            }

            return petGroup;

        }

        public void Update(PetGroup petGroup)
        {
            SqlOperation operation = _petGroupMapper.GetUpdateStatement(petGroup);
            dao.ExecuteStoredProcedure(operation);


        }
    }
}
