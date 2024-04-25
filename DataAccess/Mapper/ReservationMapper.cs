using DataAccess.Dao;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Mapper
{
    internal class ReservationMapper
    {
        public Service BuildObject(Dictionary<string, object> objectRow)
        {
            Service service = new Service()
            {
                Id = Convert.ToInt32(objectRow["idServicio"].ToString()),
                name = objectRow["nombreServicio"].ToString(),
                //ServiceDescription = objectRow["descripcionServicio"].ToString(),
                //Price = Convert.ToDouble(objectRow["precio"].ToString()),
                //ServiceAvailable = objectRow["disponibilidadServicio"].ToString() == "True"
            };
            return service;
        }

        public Reservation BuildReservation(Dictionary<string, object> objectRow)
        {
            var user = new User
            {
                IdentificationNumber = int.Parse(objectRow["numeroIdentificacion"].ToString())
            };
            var pet = new Pet
            {
                IdPet = int.Parse(objectRow["idMascota"].ToString()),
                Name = objectRow["nombre"].ToString(),
                User = user, 
            };
          
            var reservation = new Reservation

            {
                IdReservation = Convert.ToInt32(objectRow["idReserva"].ToString()),
                EnterDate = DateTime.Parse(objectRow["fechaEntrada"].ToString()),
                ExitDate = DateTime.Parse(objectRow["fechaSalida"].ToString()),
                SpecialAspects = objectRow["aspectosEspeciales"].ToString(),
                State = objectRow["estadoReserva"].ToString(),
                Pet = pet,
            };

            if (objectRow.ContainsKey("nombrePaquete"))
            {
                Package package = new Package
                {
                    PackageName = objectRow["nombrePaquete"].ToString()
                };
                reservation.Package = package;
            }

            return reservation;
        }

        public Pet BuildPetByUserId(Dictionary<string, object> objectRow)
        {
            var pet = new Pet
            {
                IdPet = int.Parse(objectRow["idMascota"].ToString()),
                Name = objectRow["nombre"].ToString(),
                Age = DateTime.Parse(objectRow["edad"].ToString()),
                PetType = objectRow["raza"].ToString(),
                Aggressiveness = int.Parse(objectRow["agresividad"].ToString()),
            };
            return pet;
        }

        public Reservation BuildReservationByUserId(Dictionary<string, object> objectRow)
        {
            var pet = new Pet
            {
                IdPet = int.Parse(objectRow["idMascota"].ToString()),
                Name = objectRow["nombre"].ToString(),
                Photo = objectRow["foto"].ToString(),
            };

            var reservation = new Reservation

            {
                IdReservation = Convert.ToInt32(objectRow["idReserva"].ToString()),
                EnterDate = DateTime.Parse(objectRow["fechaEntrada"].ToString()),
                ExitDate = DateTime.Parse(objectRow["fechaSalida"].ToString()),
                SpecialAspects = objectRow["aspectosEspeciales"].ToString(),
                State = objectRow["estadoReserva"].ToString(),
                Pet = pet,
            };

            if (objectRow.ContainsKey("nombrePaquete"))
            {
                Package package = new Package
                {
                    PackageName = objectRow["nombrePaquete"].ToString()
                };
                reservation.Package = package;
            }

            return reservation;
        }


        public List<Service> BuildObjects(List<Dictionary<string, object>> objectRows)
        {
            var lstResult = new List<Service>();

            foreach (var objRow in objectRows)
            {
                var med = BuildObject(objRow);
                lstResult.Add(med);
            }
            return lstResult;
        }

        public List<Reservation> BuildReservationsByUserId(List<Dictionary<string, object>> objectRows)
        {
            var lstResult = new List<Reservation>();

            foreach (var objRow in objectRows) 
            {
                var med = BuildReservationByUserId(objRow);
                lstResult.Add(med);
            }
            return lstResult;
        }


        public List<Pet> BuildPetsByUserId(List <Dictionary<string, object>> objectRows)
        {
            var lstResult = new List<Pet>();

            foreach (var objRow in objectRows)
            {
                var med = BuildPetByUserId(objRow);
                lstResult.Add(med);
            }
            return lstResult;
        }

        public List<Reservation> BuildReservations(List<Dictionary<string, object>> objectRows) 
        {
            var lstResult = new List<Reservation>();

            foreach (var objRow in objectRows)
            {
                var reservation = BuildReservation(objRow);
                lstResult.Add(reservation);
            }
            return lstResult;
        }


        public SqlOperation GetCreateStatement(Reservation reservation)
        {

            string additionalservicesids = "";
            for (int i = 0; i < reservation.AdditionalServices?.Count; i++)
            {
                additionalservicesids += reservation.AdditionalServices[i].Id + ",";

                if (i == reservation.AdditionalServices.Count - 1)
                {
                    additionalservicesids = additionalservicesids.Remove(additionalservicesids.Length - 1, 1);
                }
            }


            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "PR_CREATE_RESERVATION";
            operation.AddIntegerParam("idPet", reservation.Pet.IdPet);
            operation.AddDateTimeParam("enterDate", reservation.EnterDate);
            operation.AddDateTimeParam("exitDate", reservation.ExitDate);
            operation.AddVarcharParam("specialAspects", reservation.SpecialAspects);
            operation.AddIntegerParam("idPackage", reservation.Package.IdPackage);
            operation.AddVarcharParam("state", "Pendiente");
            operation.AddVarcharParam("aditionalServices", additionalservicesids);

            return operation;
        }

        public SqlOperation GetAdditionalServicesAvailableStatement(int idPackage)
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "PR_GET_ADDITIONAL_SERVICES_AVAILABLE";
            operation.AddIntegerParam("idPackage",idPackage);

            return operation;
        }

        public SqlOperation GetReservationUserById(int idUser) 
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "PR_GET_RESERVATION_BY_USER_ID";
            operation.AddIntegerParam("idUser", idUser);

            return operation;
        }

        public SqlOperation GetPetByUserId(int idUser)
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "PR_GET_PET_BY_USER_ID";
            operation.AddIntegerParam("idUser", idUser);

            return operation;
        }

        public SqlOperation RetrieveAllStatement()
        {
            SqlOperation operation = new SqlOperation();

            operation.ProcedureName = "PR_GET_ALL_RESERVATION";

            return operation;
        }

        public SqlOperation RetrieveAllByDate(DateTime initialDate, DateTime finalDate)
        {
            SqlOperation operation = new SqlOperation();

            operation.ProcedureName = "PR_GET_ALL_RESERVATION_DATE";
            operation.AddDateTimeParam("initialDate", initialDate);
            operation.AddDateTimeParam("finalDate", finalDate);

            return operation;

        }

        public SqlOperation RetrieveAllHistory(int idUser)
        {
            SqlOperation operation = new SqlOperation();

            operation.ProcedureName = "PR_GET_ALL_PAST_RESERVATION";
            operation.AddIntegerParam("idUser", idUser);


            return operation;
        }

        public Reservation BuildReservationForPayment(Dictionary<string, object> objectRow)
        {
            var pet = new Pet
            {
                IdPet = int.Parse(objectRow["idMascota"].ToString()),
                Name = objectRow["nombre"].ToString(),
            };
            var package = new Package
            {
                PackageName = objectRow["nombrePaquete"].ToString(),
                IdPackage = Convert.ToInt32(objectRow["idPaquete"].ToString()),
                Price = float.Parse(objectRow["precio"].ToString()),
            };
            var reservation = new Reservation

            {
                IdReservation = Convert.ToInt32(objectRow["idReserva"].ToString()),
                EnterDate = DateTime.Parse(objectRow["fechaEntrada"].ToString()),
                ExitDate = DateTime.Parse(objectRow["fechaSalida"].ToString()),
                Pet = pet,
                Package = package,
            };
            return reservation;
        }

        public SqlOperation GetReservationById(int pId)
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "PR_GET_RESERVATION_BY_ID";
            operation.AddIntegerParam("reservationId", pId);
            return operation;
        }

        public Service BuildServicePerReservation(Dictionary<string, object> objectRow)
        {
            Service service = new Service()
            {
                Id = int.Parse(objectRow["idServicio"].ToString()),
                name = objectRow["nombreServicio"].ToString(),
                description = objectRow["descripcionServicio"].ToString(),
                price =float.Parse(objectRow["precio"].ToString()),
                available = objectRow["disponibilidadServicio"].ToString() == "True"
            };
            return service;
        }

        public List<Service> BuildExtraServicesPerReservation(List<Dictionary<string, object>> objectRows)
        {
            List<Service> lstResult = new List<Service>();

            foreach (Dictionary<string, object> objRow in objectRows)
            {
                Service service = BuildServicePerReservation(objRow);
                lstResult.Add(service);
            }
            return lstResult;
        }
            
        public SqlOperation GetReservationExtraServicesStatement(int pReservationId)
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "PR_GET_EXTRA_SERVICES_PER_RESERVATION";
            operation.AddIntegerParam("reservationId", pReservationId);
            return operation;
        }
    }
}
