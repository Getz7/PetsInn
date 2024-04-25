using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess;
using DataAccess.Crud;

namespace AppLogic
{
    public class GroupManager
    {
        public PetGroup GetGroupById(int groupId)
        {
            PetGroupCrud petGroupCrud = new PetGroupCrud();
            return petGroupCrud.GetGroupById(groupId);

        }

        public void UpdatePetGroup(PetGroup petGroup)
        {
            PetGroupCrud petGroupCrud = new PetGroupCrud();
            petGroupCrud.Update(petGroup);
        }
    }
}
