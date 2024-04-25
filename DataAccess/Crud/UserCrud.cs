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
    public class UserCrud
    {


        private UserMapper _userMapper;
        private SqlDao dao;

        public UserCrud()
        {
            _userMapper = new UserMapper();
            dao = SqlDao.GetInstance();
        }
        public void Create(User user)
        {
            SqlOperation operation = _userMapper.GetCreateStatement(user);
            dao.ExecuteStoredProcedure(operation);
        }
        public void DeleteUser(int id)
        {
            SqlOperation operation = _userMapper.GetDeleteStatement(id);
            dao.ExecuteStoredProcedure(operation);
        }
        public void UpdateUser(User user, int id){
            SqlOperation operation = _userMapper.GetModifyStatement(user,id);
            dao.ExecuteStoredProcedure(operation);
        }

        public void Edit(User user){
            SqlOperation operation = _userMapper.GetUpdateStatement(user);
            dao.ExecuteStoredProcedure(operation);
        }
        public void ActivateUser(int id)
        {
            SqlOperation operation = _userMapper.GetActivateStatement(id);
            dao.ExecuteStoredProcedure(operation);
        }
        public void DeactivateUser(int id)
        {
            SqlOperation operation = _userMapper.GetDeactivateStatement(id);
            dao.ExecuteStoredProcedure(operation);
        }

        public User VerifyUser(string correo, string password)
        {
            User user = new User();
            var dataResults = dao.ExecuteStoredProcedureWithQuery(_userMapper.GetUserbyId(correo, password));
            if (dataResults.Count > 0)
            {
                List<User> objPo = _userMapper.VerifyUsers(dataResults);
                return (User)objPo[0];
            }
            else {
                return user;
            }
        }

        public byte[] GetSalt(string correo) {
            byte[] salt = new byte[0];
            SqlOperation operation = _userMapper.GetSaltbyUser(correo);
            List<Dictionary<string, object>> result = dao.ExecuteStoredProcedureWithQuery(operation);
            if (result.Count > 0)
            {
                salt = (byte[])result[0]["salt"];
                Console.WriteLine(salt);
            }
            return salt;
        }
        public List<T> RetrieveAll<T>()
        {
            List<T> lstResults = new List<T>();
            List<Dictionary<string, object>> dataResults = dao.ExecuteStoredProcedureWithQuery(_userMapper.RetrieveAllStatement());

            if (dataResults.Count > 0)
            {
                var dtoObjects = _userMapper.BuildObjects(dataResults);

                foreach (var objeto in dtoObjects)
                {
                    lstResults.Add((T)Convert.ChangeType(objeto, typeof(T)));
                }
            }
            return lstResults;
        }
        public List<T>RetrieveById<T>(int id)
        {
            List<T> lstResults = new List<T>();
            List<Dictionary<string, object>> dataResults = dao.ExecuteStoredProcedureWithQuery(_userMapper.RetrieveById(id));

            if (dataResults.Count > 0)
            {
                var dtoObjects = _userMapper.BuildObjects(dataResults);

                foreach (var objeto in dtoObjects)
                {
                    lstResults.Add((T)Convert.ChangeType(objeto, typeof(T)));
                }
            }
            return lstResults;
        }
    }
}