using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DataAccess.Crud;
using System.Threading.Tasks;


namespace AppLogic
{
    public class PetGroupManager
    {
        public List<PetGroup> GetData()
        {
            PetGroupCrud petGroupCrud = new PetGroupCrud();
            return petGroupCrud.RetrieveAll<PetGroup>();
        }
        public void AsignPetGroup(int idCliente, int idMascota, int idGroup)
        {

            PetGroupCrud petGroupCrud = new PetGroupCrud();
            petGroupCrud.AsignPetGroup(idCliente, idMascota, idGroup);
        }
    }
}
