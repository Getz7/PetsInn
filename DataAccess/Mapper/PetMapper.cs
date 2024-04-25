using DataAccess.Dao;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace DataAccess.Mapper
{
    internal class PetMapper
    {
        public Pet BuildObject(Dictionary<string, object> objectRow)
        {
            var user = new User 
            { 
                IdentificationNumber = int.Parse(objectRow["numeroIdentificacion"].ToString())
            };

            PetGroup group = null;
            if (!objectRow["idGrupoMascota"].ToString().Equals(""))
            {
                group = new PetGroup {
                    IdGroup = int.Parse(objectRow["idGrupoMascota"].ToString())
                };
            }
            
            var pet = new Pet

            {
                IdPet = int.Parse(objectRow["idMascota"].ToString()),
                Name = objectRow["nombre"].ToString(),
                Sex = objectRow["sexoMascota"].ToString(),
                PetType = objectRow["tipoMascota"].ToString(),
                Description = objectRow["descripcion"].ToString(),
                Age = DateTime.Parse(objectRow["edad"].ToString()),
                Breed = objectRow["raza"].ToString(),
                Aggressiveness = int.Parse(objectRow["agresividad"].ToString()),
                Photo = objectRow["foto"].ToString(),
                User = user,
                PetGroup = group,



            };
            return pet;
        }
        public List<Pet> BuildObjects(List<Dictionary<string, object>> objectRows)
        {
            var lstResult = new List<Pet>();

            foreach (var objRow in objectRows)
            {
                var pet = BuildObject(objRow);
                lstResult.Add(pet);
            }
            return lstResult;
        }
        public SqlOperation GetCreateStatement(Pet pet)
        {

            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "PR_CREATE_PET";
            operation.AddVarcharParam("name", pet.Name);
            operation.AddVarcharParam("petType", pet.PetType);
            operation.AddVarcharParam("description", pet.Description);
            operation.AddDateTimeParam("age", pet.Age);
            operation.AddVarcharParam("breed", pet.Breed);
            operation.AddIntegerParam("aggressiveness", pet.Aggressiveness);
            operation.AddVarcharParam("photo", pet.Photo);
            operation.AddVarcharParam("sex", pet.Sex);
            operation.AddIntegerParam("identificationNumber", pet.User?.IdentificationNumber);
            operation.AddIntegerParam("idPetGroup", pet.PetGroup?.IdGroup);
            
            return operation;
        }
        public SqlOperation RetrievePetsListById(int id)
        {
            SqlOperation operation = new SqlOperation();

            operation.ProcedureName = "PR_GET_PETS_BY_ID";
            operation.AddIntegerParam("id", id);

            return operation;
        }
        public SqlOperation RetrievePetsForSelect()
        {
            SqlOperation operation = new SqlOperation();

            operation.ProcedureName = "PR_GET_PETS";
            

            return operation;
        }
    }
}



