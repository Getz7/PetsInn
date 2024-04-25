using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class Pet
    {
        public int? IdPet { get; set; }
        public string? Name { get; set; }
        public string? Sex { get; set; }
        public string? PetType { get; set; }
        public string? Description { get; set; }
        public  DateTime? Age { get; set; }
        public string? Breed { get; set; }
        public int? Aggressiveness { get; set; }
        public string? Photo { get; set; }
        public PetGroup? PetGroup { get; set; }
        public User? User { get; set; }
        
        


    }
}
