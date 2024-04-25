using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class Service
    {
        public int? Id { get; set; }
        public string? name { get; set; }
        public string? description { get; set; }
        public float? price { get; set; }
        public Boolean? available { get; set; }
    }
}
