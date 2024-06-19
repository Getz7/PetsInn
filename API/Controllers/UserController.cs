using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using AppLogic;
using DTO;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers

{
    [EnableCors("MyCorsPolicy")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        [HttpGet]
        public string Test(){
            return "Controller Working";
        }

        [HttpPost]
        //Llama al task manager para crear una tarea y guardarla 
        public string CreateUser(DTO.User user){
            UserManager userManager = new UserManager();
            userManager.CreateUser(user);
            return "Success";
        }

        [HttpPost]
        public string EditUser(DTO.User user){
            UserManager tm = new UserManager();
            tm.EditUser(user);
            return "Success";
        }
        [HttpPost]
        public User VerifyUser(string correo, string password)
        {

            UserManager userManager = new UserManager();
            User user = userManager.VerifyUser(correo, password);
            //SI el usuario es valido, voy a obtener un objeto con datos. Si el usuario no es valido, 
            //voy a obtener un objeto vacio. 

            //Usar el objeto para guardar datos en sesión. 

            return user;

        }
        [HttpPost]
        public string DeleteUserById(int id)
        {

            UserManager userManager = new UserManager();
            userManager.DeleteUser(id);

            return "Eliminado con exito";

        }
        [HttpPost]
        public string UpdateUser(User user, int id)
        {

            UserManager userManager = new UserManager();
            userManager.UpdateUser(user, id);

            return "Modificado con exito";

        }

        [HttpGet]
        public List<User> GetData()
        {
            UserManager userManager = new UserManager();
            return userManager.GetData();
        }
        [HttpGet]
        public List<User>GetUserbyId(int id)
        {
            UserManager userManager = new UserManager();
            return userManager.GetUserbyId(id);
        }

        [HttpGet]
        public User GetUserbyIdNumber(int id)
        {
            UserManager userManager = new UserManager();
            List<User> users = userManager.GetUserbyId(id);
            if(users.Count > 0)
            {
                return users[0];
            }
            else
            {
                return null;
            }
        }

        [HttpPost]
        public string ActivateUser(int id)
        {

            UserManager userManager = new UserManager();
            userManager.ActivateUser(id);

            return "Modificado con exito";

        }
        [HttpPost]
        public string DeactivateUser(int id)
        {

            UserManager userManager = new UserManager();
            userManager.DeactivateUser(id);

            return "Modificado con exito";

        }
    }
}