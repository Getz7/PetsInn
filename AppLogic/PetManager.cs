using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DataAccess.Crud;
using System.Threading.Tasks;

namespace AppLogic
{
    public class PetManager
    {
        public void CreatePet(Pet pet)
        {
            PetCrud petCrud = new PetCrud();
            petCrud.Create(pet);

        }
        public List<Pet> GetPetsListById(int id)
        {
            
            PetCrud petCrud = new PetCrud();
            return petCrud.RetrievePetsListById<Pet>(id);
        }
        public List<Pet> GetPetsForSelect()
        {

            PetCrud petCrud = new PetCrud();
            return petCrud.RetrievePetsForSelect<Pet>();
        }
    }
}
