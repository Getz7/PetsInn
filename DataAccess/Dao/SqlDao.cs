using System.Data.SqlClient;
using System.Data;

namespace DataAccess.Dao
{
    public class SqlDao
    {
        private static SqlDao instance = new SqlDao();
        private readonly string _connString = "Server=.\\MSSQLSERVER2023;Database=PetsInnDataBase;Trusted_Connection=True;";

        //Reviso si existe conexion a DB. Si la hay la uso, si no la creo. 
        public static SqlDao GetInstance()
        {
            instance ??= new SqlDao();
            return instance;
        }

        public void ExecuteStoredProcedure(SqlOperation operation)
        {
            string connectionString = _connString;
            SqlConnection connection = new SqlConnection(connectionString);

            SqlCommand command = new SqlCommand();
            command.Connection = connection;
            command.CommandText = operation.ProcedureName;
            command.CommandType = CommandType.StoredProcedure;

            foreach (var parameter in operation.parameters)
            {
                command.Parameters.Add(parameter);
            }

            connection.Open();

            command.ExecuteNonQuery();
        }
        public List<Dictionary<string, object>> ExecuteStoredProcedureWithQuery(SqlOperation operation)
        {
            var conn = _connString;
            List<Dictionary<string, object>> lstResults = new List<Dictionary<string, object>>();

            var connection = new SqlConnection(conn);
            var command = new SqlCommand();

            //preparar el comando a ejecutar
            command.Connection = connection;
            command.CommandText = operation.ProcedureName;
            command.CommandType = CommandType.StoredProcedure;

            //Agregar los parametros
            foreach (var p in operation.parameters)
            {
                command.Parameters.Add(p);
            }

            connection.Open();
            SqlDataReader reader = command.ExecuteReader();

            //Recorrer el resultado para poder armar la Lista de diccionarios
            if (reader.HasRows)
            {
                while (reader.Read())
                {
                    Dictionary<string, object> diccObj = new Dictionary<string, object>();

                    for (var fieldCount = 0; fieldCount < reader.FieldCount; fieldCount++)
                    {
                        diccObj.Add(reader.GetName(fieldCount), reader.GetValue(fieldCount));
                    }

                    lstResults.Add(diccObj);
                }
            }
            return lstResults;
        }

    }
}