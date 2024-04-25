using DataAccess.Dao;
using DTO;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Mapper
{
    internal class GroupMapper
    {
        public PetGroup BuildObject(Dictionary<string, object> objectRow)
        {
            var petGroup = new PetGroup
            {
                IdGroup = int.Parse(objectRow["idGrupoMascota"].ToString()),
                PetGroupName = objectRow["nombreGrupoMascota"].ToString(),
                PetGroupDescription = objectRow["descripcionGrupoMascota"].ToString(),
                PetGroupSize = int.Parse(objectRow["tamanno"].ToString()),
                PetGroupType = objectRow["tipoMascotaPermitida"].ToString(),
                PetGroupAggressiveness = int.Parse(objectRow["agresividadPermitida"].ToString())

            };
            return petGroup;
        }
        public List<PetGroup> BuildObjects(List<Dictionary<string, object>> objectRows)
        {
            var lstResult = new List<PetGroup>();

            foreach (var objRow in objectRows)
            {
                var petGroup = BuildObject(objRow);
                lstResult.Add(petGroup);
            }
            return lstResult;
        }

        public SqlOperation GetUpdateStatement(PetGroup petGroup)
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "PR_UPDATE_GROUP";
            operation.AddIntegerParam("idPetGroup", petGroup.IdGroup);
            operation.AddVarcharParam("petGroupName", petGroup.PetGroupName);
            operation.AddIntegerParam("petGroupSize", petGroup.PetGroupSize);
            operation.AddVarcharParam("petGroupType", petGroup.PetGroupType);
            operation.AddVarcharParam("petGroupDescription", petGroup.PetGroupDescription);
            operation.AddIntegerParam("petGroupAggressiveness", petGroup.PetGroupAggressiveness);


            return operation;
        }

        internal SqlOperation GetGroupByIdStatement(int groupId)
        {
            SqlOperation operation = new SqlOperation();
            operation.ProcedureName = "PR_GET_GROP_BY_ID";
            operation.AddIntegerParam("idPetGroup", groupId);

            return operation;
        }
    }
}
