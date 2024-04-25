using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class PetGroup
    {

        public int? IdGroup { get; set; }
        public int? tamanno { get; set; }
        public string? PetGroupName { get; set; }
        public string? PetGroupDescription { get; set; }
        public int? PetGroupSize { get; set; }

        public string? PetGroupType { get; set; }
        public int? PetGroupAggressiveness { get; set; }


    }
}
