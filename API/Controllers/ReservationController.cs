using AppLogic;
using DTO;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;

namespace API.Controllers
{
    [EnableCors("MyCorsPolicy")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ReservationController : Controller
    {
        [HttpPost]
        public int CreateReservation(Reservation reservation)
        {

            ReservationManager reservationManager = new ReservationManager();
            

            int newReservationId = reservationManager.CreateReservation(reservation);
            return newReservationId;
        }

        [HttpGet]
        public List<Service> GetAdditionalServicesAvailable(int idPackage) 
        {
            ReservationManager reservationManager = new ReservationManager();
            

            return reservationManager.GetAdditionalServicesAvailable(idPackage); ;
        }

        [HttpGet]
        public List<Reservation> GetData()
        {
            ReservationManager reservationManager = new ReservationManager();
            return reservationManager.GetData();
        }

        [HttpGet]
        public List<Reservation> GetDataByDate( DateTime initialDate, DateTime finalDate)
        {
            ReservationManager reservationManager = new ReservationManager();
            return reservationManager.GetDataByDate(initialDate, finalDate);

        }

        [HttpGet]
        public List<Reservation> GetDataHistory(int idUser)
        {
            ReservationManager reservationManager = new ReservationManager();
            return reservationManager.GetDataHistory(idUser);
        }


        [HttpGet]
        public List<Reservation> GetReservationByUserId(int idUser)
        {
            ReservationManager reservationManager = new ReservationManager();
            return reservationManager.GetReservationByUserId(idUser);
        }

        [HttpGet]
        public List<Pet> GetPetByUserId(int idUser)
        {
            ReservationManager reservationManager =  new ReservationManager();
            return reservationManager.GetPetByUserId(idUser);
        }

        [HttpGet]
        public Reservation GetReservationById(int pId)
        {
            ReservationManager reservationManager = new ReservationManager();
            return reservationManager.GetReservationById(pId);  
        }

        [HttpGet]
        public List<Service> GetExtraServicesPerReservation(int pReservationId)
        {
            ReservationManager reservationManager = new ReservationManager();
            return reservationManager.GetReservationExtraServices(pReservationId);
        }
    }
}
