using AppLogic;
using DTO;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers

{
    [ApiController]
    [Route("[controller]/[action]")]
    public class PetsController : Controller
    {
        [HttpPost]
        public string CreatePet(Pet pet)
        {
            PetManager petManager = new PetManager();
            petManager.CreatePet(pet);
           

            return "Mascota registrada con éxito";
        }
        [HttpGet]
        public List<Pet> GetPetsListbyId(int id)
        {
            PetManager petManager = new PetManager();
            return petManager.GetPetsListById(id);
        }
        [HttpGet]
        public List<Pet>GetPetsForSelect()
        {
            PetManager petManager = new PetManager();
            return petManager.GetPetsForSelect();
        }

        [HttpGet]
        public List<Pet> GetAllPets()
        {
            PetManager petManager = new PetManager();
            return petManager.GetPetsForSelect();
        }
    }
}
