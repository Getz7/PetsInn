using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DTO;
using DataAccess.Crud;

namespace AppLogic
{
    public class BoardManager
    {
        public BoardManager() { }
        public void CreateMedition(Temp_Humedad data)
        {
          
            BoardCrud boardCrud = new BoardCrud();
            boardCrud.CreateMedition(data);
        }
        public void AsignPetBoard(string idPlaca, int idMascota)
        {

            BoardCrud boardCrud = new BoardCrud();
            boardCrud.AsignPetBoard(idPlaca, idMascota);
        }
        public List<Temp_Humedad> GetData()
        {
         BoardCrud boardCrud = new BoardCrud();  
            return boardCrud.RetrieveAll<Temp_Humedad>();
        }
        public List<Temp_Humedad> GetBoardsAvailable()
        {
            BoardCrud boardCrud = new BoardCrud();
            return boardCrud.RetrieveBoardsAvailable<Temp_Humedad>();
        }
        public List<Temp_Humedad> GetIdBoard()
        {
            BoardCrud boardCrud = new BoardCrud();
            return boardCrud.RetrieveAll<Temp_Humedad>();
        }
        public List<Temp_Humedad> GetDataByDate(DateTime initialDate, DateTime finalDate,int idPet)
        {
            BoardCrud boardCrud = new BoardCrud();
            return boardCrud.RetrieveAllByDate<Temp_Humedad>(initialDate,finalDate,idPet);
        }
    }
}
