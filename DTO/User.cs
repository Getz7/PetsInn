using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class User
    {
        public string? Name { get; set; }
        public string? LastName { get; set; }
        public int? IdentificationNumber { get; set; }
        public string? IdentificationType { get; set; }
        public string? Email { get; set; }
        public string? Address { get; set; }
        public string? Photo { get; set; }
        public string? Password { get; set; }
        public Boolean Active { get; set; }
        public int idRol { get; set; }
        public byte[]? salt { get; set; }
    }
}
