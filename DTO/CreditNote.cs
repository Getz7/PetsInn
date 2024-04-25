using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class CreditNote
    {
        public int Id { get; set; }
        public float Amount { get; set; }
        public User UserId { get; set; }
    }
}
