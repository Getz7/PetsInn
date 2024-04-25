using DataAccess.Crud;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace AppLogic
{
    public class UserManager
    {
        //Ejecutar la operación CRUD. Alterar datos. 
        public void CreateUser(User user)
        {
            UserCrud UserCrud = new UserCrud();
            var salt = GenerateByte();
            user.Password = HashPasword(user.Password,salt);
            user.salt = salt;
            UserCrud.Create(user);
        }

        public void EditUser(User user)
        {
            UserCrud UserCrud = new UserCrud();
            var salt = GenerateByte();
            user.Password = HashPasword(user.Password,salt);
            user.salt = salt;
            UserCrud.Edit(user);
        }
        public User VerifyUser(string correo, string password)
        {
            UserCrud userCrud = new UserCrud();
            byte[] salt = userCrud.GetSalt(correo);
            string hashed_pwd = HashPasword(password, salt);
            User user = userCrud.VerifyUser(correo, hashed_pwd);
            return user;
        }
        public void DeleteUser(int id)
        {
            UserCrud userCrud = new UserCrud();
            userCrud.DeleteUser(id);
           
        }
        public void UpdateUser(User user,int id){
            UserCrud userCrud = new UserCrud();
            var salt = GenerateByte();
            user.Password = HashPasword(user.Password, salt);
            user.salt = salt;
            userCrud.UpdateUser(user,id);
        }
        public List<User> GetData()
        {
            UserCrud userCrud = new UserCrud();
            return userCrud.RetrieveAll<User>();
        }
        public List<User>GetUserbyId(int id)
        {
            UserCrud userCrud = new UserCrud();
            return userCrud.RetrieveById<User>(id);
        }
        public void ActivateUser(int id)
        {
            UserCrud usercrud = new UserCrud();
            usercrud.ActivateUser(id);

        }
        public void DeactivateUser(int id)
        {
            UserCrud usercrud = new UserCrud();
            usercrud.DeactivateUser(id);

        }

        string HashPasword(string password, byte[] salt)
        {
            //Se definen algunos parámetros para la encryptación
            const int keySize = 4;
            const int iterations = 350000;
            HashAlgorithmName hashAlgorithm = HashAlgorithmName.SHA512;

            var hash = Rfc2898DeriveBytes.Pbkdf2(
                Encoding.UTF8.GetBytes(password),
                salt,
                iterations,
                hashAlgorithm,
                keySize);

            string hash_string = Convert.ToHexString(hash);

            return hash_string;
        }

        byte[] GenerateByte()
        {
            const int keySize = 4;
            //Se genera un número aleatorio para mejorar la seguridad
            byte[] salt = RandomNumberGenerator.GetBytes(keySize);
            return salt;
        }
    }
}
