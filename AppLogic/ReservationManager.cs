using DataAccess.Crud;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppLogic
{
    public class ReservationManager
    {
        public int CreateReservation(Reservation reservation)
        {
            ReservationCrud reservationCrud = new ReservationCrud();
            return reservationCrud.Create(reservation);

        }

        public List<Service> GetAdditionalServicesAvailable(int idPackage)
        {
            ReservationCrud reservationCrud = new ReservationCrud();
            return reservationCrud.GetAdditionalServicesAvailable(idPackage);
        }

        public List<Reservation> GetData()
        {
            ReservationCrud reservationCrud = new ReservationCrud();
            return reservationCrud.RetrieveAll<Reservation>();
        }

        public List<Reservation> GetDataByDate(DateTime initialDate, DateTime finalDate) 
        {
            ReservationCrud reservationCrud = new ReservationCrud();
            return reservationCrud.RetrieveAllByDate<Reservation>(initialDate, finalDate);
        }

        public List<Reservation> GetDataHistory(int idUser)
        {
            ReservationCrud reservationCrud = new ReservationCrud();
            return reservationCrud.RetrieveAllHistory<Reservation>(idUser);
        }

        public List<Reservation> GetReservationByUserId(int idUser)
        {
            ReservationCrud reservationCrud = new ReservationCrud();
            return reservationCrud.GetReservationByUserId(idUser);
        }

        public Reservation GetReservationById(int pId)
        {
            ReservationCrud reservationCrud = new ReservationCrud();
            Reservation reservation = reservationCrud.GetReservationById(pId);

            ServiceCrud serviceCrud = new ServiceCrud();
            if (reservation?.Package != null)
            {
                reservation.Package.Services = serviceCrud.GetServicesByPackageId(reservation.Package.IdPackage.GetValueOrDefault(0));

            }

            return reservation;

        }

        public List<Pet> GetPetByUserId(int idUser)
        {
            ReservationCrud reservationCrud = new ReservationCrud();
            return reservationCrud.GetPetByUserId(idUser);
        }

        public List<Service> GetReservationExtraServices(int pReservationId)
        {
            ReservationCrud reservationCrud = new ReservationCrud();
            return reservationCrud.GetReservationExtraServices(pReservationId);
        }
    }
}
