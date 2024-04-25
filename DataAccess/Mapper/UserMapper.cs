using DataAccess.Crud;
using DataAccess.Dao;
using DTO;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Mapper
{
    internal class UserMapper
    {
       
        public User VerifyUser(Dictionary<string, object> objectRow)
        {
            var user = new User
            {
                IdentificationNumber = int.Parse(objectRow["numeroIdentificacion"].ToString()),
                idRol = int.Parse(objectRow["idRol"].ToString())
            };
            return user;
        }
     
        public List<User> VerifyUsers(List<Dictionary<string, object>> objectRows)
        {
            var lstResult = new List<User>();

            foreach (var objRow in objectRows){
                var user = VerifyUser(objRow);
                lstResult.Add(user);
            }
            return lstResult;
        }
        public SqlOperation GetUserbyId(string correo, string password)
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "PR_READ_USER_BY_ID";
            operation.AddVarcharParam("correo", correo);
            operation.AddVarcharParam("Password", password);
            return operation;
        }
        public User BuildObject(Dictionary<string, object> objectRow)
        {
            var user = new User
            {
                Name = objectRow["nombre"].ToString(),
                LastName = objectRow["apellidos"].ToString(),
                IdentificationNumber = int.Parse(objectRow["numeroIdentificacion"].ToString()),
                IdentificationType = objectRow["tipoIdentificacion"].ToString(),
                Email = objectRow["correo"].ToString(),
                Address = objectRow["direccion"].ToString(),
                Password = objectRow["contrasenna"].ToString(),
                Active = objectRow["activo"].ToString() == "1",
                idRol = int.Parse(objectRow["idRol"].ToString())
            };
            return user;
        }
        public List<User> BuildObjects(List<Dictionary<string, object>> objectRows)
        {
            var lstResult = new List<User>();

            foreach (var objRow in objectRows)
            {
                var user = BuildObject(objRow);
                lstResult.Add(user);
            }
            return lstResult;
        }

        public SqlOperation GetCreateStatement(User user)
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "PR_CREATE_USER";
            operation.AddIntegerParam("numeroIdentificacion", user.IdentificationNumber);
            operation.AddVarcharParam("nombre", user.Name);
            operation.AddVarcharParam("apellidos", user.LastName);
            operation.AddVarcharParam("tipoIdentificacion", user.IdentificationType);
            operation.AddVarcharParam("correo", user.Email);
            operation.AddVarcharParam("direccion", user.Address);
            operation.AddVarcharParam("foto", user.Photo);
            operation.AddIntegerParam("idRol", 3);
            operation.AddVarcharParam("contrasenna", user.Password);
            operation.AddIntegerParam("activo", 1);
            operation.AddVineryParam("salt", user.salt);
            return operation;
        }
        public SqlOperation GetDeleteStatement(int id)
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "PR_DELETE_USER";
            operation.AddIntegerParam("id", id);
            
            return operation;
        }
        public SqlOperation RetrieveAllStatement()
        {
            SqlOperation operation = new SqlOperation();

            operation.ProcedureName = "PR_GET_ALL_USERS";


            return operation;
        }
        public SqlOperation RetrieveById(int id)
        {
            SqlOperation operation = new SqlOperation();

            operation.ProcedureName = "PR_GET_USER_BY_ID";
            operation.AddIntegerParam("id", id);

            return operation;
        }
        public SqlOperation GetUpdateStatement(User user)
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "PR_UPDATE_USER";
            operation.AddVarcharParam("password", user.Password);
            operation.AddIntegerParam("numeroIdentificacion", user.IdentificationNumber);
            operation.AddVineryParam("salt", user.salt);
            return operation;
        }
        public SqlOperation GetModifyStatement(User user, int id)
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "PR_MODIFY_USER";
            operation.AddIntegerParam("id", id);
            operation.AddVarcharParam("password", user.Password);
            operation.AddVineryParam("salt", user.salt);
            operation.AddIntegerParam("idRol", user.idRol);
            operation.AddVarcharParam("email", user.Email);
            operation.AddVarcharParam("address", user.Address);

            return operation;
        }
        public SqlOperation GetActivateStatement(int id)
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "PR_ACTIVATE_USER";
            operation.AddIntegerParam("id", id);
            return operation;
        }
        public SqlOperation GetDeactivateStatement(int id)
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "PR_DEACTIVATE_USER";
            operation.AddIntegerParam("id", id);
            return operation;
        }

        public SqlOperation GetSaltbyUser(string correo)
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "PR_GET_SALT_BY_USER";
            operation.AddVarcharParam("correo", correo);
            return operation;
        }
    }
}
