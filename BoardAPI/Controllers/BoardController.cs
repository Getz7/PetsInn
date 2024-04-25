using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using DTO;
using AppLogic;

namespace API.Controllers

{
    [EnableCors("MyCorsPolicy")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class BoardController
    {

        [HttpGet]
        public string Test()
        {
            return "Controller Working";
        }
        [HttpGet]
        public List<Temp_Humedad> GetData()
        {
            BoardManager boardManager = new BoardManager();
            return boardManager.GetData();
        }
        [HttpGet]
        public List<Temp_Humedad> GetBoardsAvailable()
        {
            BoardManager boardManager = new BoardManager();
            return boardManager.GetBoardsAvailable();
        }
        [HttpGet]
        public List<Temp_Humedad> GetDataByDate( DateTime initialDate,DateTime finalDate,int idPet)
        {
            BoardManager boardManager = new BoardManager();
            return boardManager.GetDataByDate(initialDate,finalDate,idPet);
        }



        [HttpPost]
        public string InsertBoardData([FromBody] Temp_Humedad data)
        {
            BoardManager boardManager = new BoardManager();
            boardManager.CreateMedition(data);
            Console.WriteLine("Datos enviados a la base ");
            return "Data received successfully.";
        }

        [HttpPost]
        public string AsignPetBoard(string idPlaca, int idMascota)
        {
            BoardManager boardManager = new BoardManager();
            boardManager.AsignPetBoard(idPlaca, idMascota);
            Console.WriteLine("Datos enviados a la base ");
            return "Data received successfully.";
        }





    }
}