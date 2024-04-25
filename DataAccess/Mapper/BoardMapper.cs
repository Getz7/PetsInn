using DataAccess.Dao;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.Crud;
using DTO;
using static System.Runtime.InteropServices.JavaScript.JSType;


namespace DataAccess.Mapper
{
    public class BoardMapper
    {
        public Temp_Humedad BuildObject(Dictionary<string, object> objectRow)
        {
            var med = new Temp_Humedad
            {
                humidity = objectRow["humedad"].ToString(),
                temp = objectRow["temperatura"].ToString(),
                date = DateTime.Parse(objectRow["fechaMedicion"].ToString()),
                idPlaca = objectRow["idPlacaMascota"].ToString(),
                idMascota = int.Parse(objectRow["idMascota"].ToString())
            };
            return med;
        }
        public Temp_Humedad BuildBoardId(Dictionary<string, object> objectRow)
        {
            var med = new Temp_Humedad
            {
               
                idPlaca = objectRow["idPlacaMascota"].ToString()
                
            };
            return med;
        }
        public SqlOperation RetrieveAllStatement()
        {
            SqlOperation operation = new SqlOperation();

            operation.ProcedureName = "PR_GET_ALL_BOARD";

            return operation;
        }
        public SqlOperation RetrieveAvailable()
        {
            SqlOperation operation = new SqlOperation();

            operation.ProcedureName = "PR_GET_AVAILABLE_BOARD";

            return operation;
        }
        public SqlOperation RetrieveAllByDate(DateTime initialDate, DateTime finalDate, int idPet)
        {
            SqlOperation operation = new SqlOperation();

            operation.ProcedureName = "PR_GET_ALL_BOARD_DATE";
            operation.AddDateTimeParam("initialDate", initialDate);
            operation.AddDateTimeParam("finalDate", finalDate);
            operation.AddIntegerParam("idPet", idPet);

            return operation;
        }


        public List<Temp_Humedad> BuildObjects(List<Dictionary<string, object>> objectRows)
        {
            var lstResult = new List<Temp_Humedad>();

            foreach (var objRow in objectRows)
            {
                var med = BuildObject(objRow);
                lstResult.Add(med);
            }
            return lstResult;
        }
        public List<Temp_Humedad> BuildBoardIds(List<Dictionary<string, object>> objectRows)
        {
            var lstResult = new List<Temp_Humedad>();

            foreach (var objRow in objectRows)
            {
                var med = BuildBoardId(objRow);
                lstResult.Add(med);
            }
            return lstResult;
        }

        public SqlOperation GetCreateStatement(Temp_Humedad data)
        {
            DateTime date = DateTime.Now;
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "PR_CREATE_MED";
            operation.AddVarcharParam("humidity", data.humidity);
            operation.AddVarcharParam("temp", data.temp);
            operation.AddDateTimeParam("date", date);
            operation.AddVarcharParam("idPlaca", data.idPlaca);

            return operation;
        }
        public SqlOperation GetAsignStatement(string idPlaca,  int idMascota)
        {
            
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "PR_ASIGN_BOARD";
            operation.AddIntegerParam("idMascota", idMascota);
            operation.AddVarcharParam("idPlaca", idPlaca);

            return operation;
        }


    }
}
