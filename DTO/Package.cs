using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class Package
    {
        public int? IdPackage {  get; set; }
        public string? PackageName { get; set; }
        public string? PackageDescription { get; set; }
        public double? Price { get; set; }
        public List<Service>? Services { get; set; } 
    }
}
