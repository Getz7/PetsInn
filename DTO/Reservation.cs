using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class Reservation
    {
        public int? IdReservation {  get; set; } 
        public Pet? Pet {  get; set; } 
        public DateTime? EnterDate { get; set; }
        public DateTime? ExitDate { get; set; }  
        public string? SpecialAspects {  get; set; }
        public Package? Package {  get; set; }
        public string? State { get; set; }   
        public List<Service>? AdditionalServices { get; set; }
        
    }
}
