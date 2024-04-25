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
    public class ReservationCrud
    {
        private ReservationMapper _reservationMapper;
        private SqlDao dao;
        public ReservationCrud()
        {
            _reservationMapper = new ReservationMapper();
            dao = SqlDao.GetInstance();
        }
        public int Create(Reservation reservation)
        {
            SqlOperation operation = _reservationMapper.GetCreateStatement(reservation);
            List<Dictionary<string, object>> dataResults = dao.ExecuteStoredProcedureWithQuery(operation);

            int newReservationId = 0;

            if (dataResults.Count > 0)
            {
                newReservationId = Convert.ToInt32(dataResults[0]["idReserva"]);
            }

            return newReservationId;
        }

        //public List<Service> GetAdditionalServicesAvailable(int idPackage)
        //{
        //    SqlOperation operation = _reservationMapper.GetAdditionalServicesAvailableStatement(idPackage);
        //    dao.ExecuteStoredProcedureWithQuery(operation);

        //}

        public List<Service> GetAdditionalServicesAvailable(int idPackage)
        {
            List<Service> lstResults = new List<Service>();
            List<Dictionary<string, object>> dataResults = dao.ExecuteStoredProcedureWithQuery(_reservationMapper.GetAdditionalServicesAvailableStatement(idPackage));

            if (dataResults.Count > 0)
            {
                var dtoObjects = _reservationMapper.BuildObjects(dataResults);

                foreach (var objeto in dtoObjects)
                {
                    lstResults.Add((Service)Convert.ChangeType(objeto, typeof(Service)));
                }
            }
            return lstResults;
        }

        public List<Reservation> GetReservationByUserId(int idUser) 
        {
            List<Reservation> lstResults = new List<Reservation>();
            List<Dictionary<string, object>> dataResults = dao.ExecuteStoredProcedureWithQuery(_reservationMapper.GetReservationUserById(idUser));

            if(dataResults.Count > 0)
            {
                var dtoObjects = _reservationMapper.BuildReservationsByUserId(dataResults);
                foreach (var objeto in dtoObjects)
                {
                    lstResults.Add((Reservation)Convert.ChangeType(objeto,typeof(Reservation)));
                }
            }
            return lstResults;
        }

        public List<Pet> GetPetByUserId(int idUser) 
        {
            List<Pet> lstResults = new List<Pet>();
            List<Dictionary<string, object>> dataResults = dao.ExecuteStoredProcedureWithQuery(_reservationMapper.GetPetByUserId(idUser));

            if (dataResults.Count > 0)
            {
                var dtoObjects = _reservationMapper.BuildPetsByUserId(dataResults);
                foreach (var objeto in dtoObjects)
                {
                    lstResults.Add((Pet)Convert.ChangeType(objeto, typeof(Pet)));
                }
            }
            return lstResults;
        }


        public List<T> RetrieveAll<T>()
        {
            List<T> lstResults = new List<T>();
            List<Dictionary<string, object>> dataResults = dao.ExecuteStoredProcedureWithQuery(_reservationMapper.RetrieveAllStatement());

            if (dataResults.Count > 0)
            {
                var dtoObjects = _reservationMapper.BuildReservations(dataResults);

                foreach (var objeto in dtoObjects)
                {
                    lstResults.Add((T)Convert.ChangeType(objeto, typeof(T)));
                }
            }
            return lstResults;
        }

        public List<T> RetrieveAllHistory<T>(int idUser)
        {
            List<T> lstResults = new List<T>();
            List<Dictionary<string, object>> dataResults = dao.ExecuteStoredProcedureWithQuery(_reservationMapper.RetrieveAllHistory(idUser));

            if (dataResults.Count > 0)
            {
                var dtoObjects = _reservationMapper.BuildReservations(dataResults);

                foreach (var objeto in dtoObjects)
                {
                    lstResults.Add((T)Convert.ChangeType(objeto, typeof(T)));
                }
            }
            return lstResults;
        }

        public List<T> RetrieveAllByDate<T>(DateTime initialDate, DateTime finalDate)
        {
            List<T> lstResults = new List<T>();
            List<Dictionary<string, object>> dataResults = dao.ExecuteStoredProcedureWithQuery(_reservationMapper.RetrieveAllByDate(initialDate, finalDate));

            if (dataResults.Count > 0) 
            {
                var dtoObjects = _reservationMapper.BuildReservations(dataResults);

                foreach(var objeto in dtoObjects)
                {
                    lstResults.Add((T)Convert.ChangeType(objeto, typeof(T)));
                }
            }
            return lstResults;
        }

        public Reservation GetReservationById(int pId)
        {
            SqlOperation operation = _reservationMapper.GetReservationById(pId);
            List<Dictionary<string, object>> result = dao.ExecuteStoredProcedureWithQuery(operation);
            Reservation reservation = null;
            if (result.Count > 0)
            {
                reservation = _reservationMapper.BuildReservationForPayment(result[0]);
            }
            return reservation;
        }

        public List<Service> GetReservationExtraServices(int pReservationId)
        {
            SqlOperation operation = _reservationMapper.GetReservationExtraServicesStatement(pReservationId);
            List<Dictionary<string, object>> result = dao.ExecuteStoredProcedureWithQuery(operation);
            List<Service> services = _reservationMapper.BuildExtraServicesPerReservation(result);
            
            return services;
        }

    }
}