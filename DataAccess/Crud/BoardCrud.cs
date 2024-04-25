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
    public class BoardCrud
    {
        private BoardMapper _boardMapper;
        protected SqlDao dao;

        //Inicializo el objeto con un mapper y un dao.
        public BoardCrud()
        {
            _boardMapper = new BoardMapper();
            dao = SqlDao.GetInstance();
        }

        public void CreateMedition(Temp_Humedad data)
        {
            SqlOperation operation = _boardMapper.GetCreateStatement(data);
            dao.ExecuteStoredProcedure(operation);
        }
        public void AsignPetBoard( string idPlaca,  int idMascota)
        {
            SqlOperation operation = _boardMapper.GetAsignStatement(idPlaca, idMascota);
            dao.ExecuteStoredProcedure(operation);
        }
        public  List<T> RetrieveAll<T>()
        {
            List<T> lstResults = new List<T>();
            List<Dictionary<string, object>> dataResults = dao.ExecuteStoredProcedureWithQuery(_boardMapper.RetrieveAllStatement());

            if (dataResults.Count > 0)
            {
                var dtoObjects = _boardMapper.BuildObjects(dataResults);

                foreach (var objeto in dtoObjects)
                {
                    lstResults.Add((T)Convert.ChangeType(objeto, typeof(T)));
                }
            }
            return lstResults;
        }
        public List<T> RetrieveBoardsAvailable<T>()
        {
            List<T> lstResults = new List<T>();
            List<Dictionary<string, object>> dataResults = dao.ExecuteStoredProcedureWithQuery(_boardMapper.RetrieveAvailable());

            if (dataResults.Count > 0)
            {
                var dtoObjects = _boardMapper.BuildBoardIds(dataResults);

                foreach (var objeto in dtoObjects)
                {
                    lstResults.Add((T)Convert.ChangeType(objeto, typeof(T)));
                }
            }
            return lstResults;
        }
        public List<T> RetrieveAllByDate<T>(DateTime initialDate, DateTime finalDate,int idPet)
        {
            List<T> lstResults = new List<T>();
            List<Dictionary<string, object>> dataResults = dao.ExecuteStoredProcedureWithQuery(_boardMapper.RetrieveAllByDate(initialDate,finalDate, idPet));

            if (dataResults.Count > 0)
            {
                var dtoObjects = _boardMapper.BuildObjects(dataResults);

                foreach (var objeto in dtoObjects)
                {
                    lstResults.Add((T)Convert.ChangeType(objeto, typeof(T)));
                }
            }
            return lstResults;
        }

    }
}
