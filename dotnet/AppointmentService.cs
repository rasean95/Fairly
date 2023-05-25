using Fairly.Data;
using Fairly.Data.Providers;
using Fairly.Models;
using Fairly.Models.Domain.Appointment;
using Fairly.Models.Domain.Locations;
using Fairly.Models.Domain.Users;
using Fairly.Models.Requests.Appointments;
using Fairly.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Fairly.Services
{
    public class AppointmentService : IAppointmentService
    {

        private static IDataProvider _data = null;
        private static IBaseUserMapper _userMapper = null;
        private static ILookUpService _lookUpService = null;

        public AppointmentService(IDataProvider data, IBaseUserMapper userMapper, ILookUpService lookUpService)
        {
            _data = data;
            _userMapper = userMapper;
            _lookUpService = lookUpService;
        }


        public Paged<Appointment> GetAppointmentByClientId(int pageIndex, int pageSize, int clientId)
        {
            string procName = "[dbo].[Appointments_Select_ByClientId]";
            Paged<Appointment> pagedResult = null;
            List<Appointment> result = null;
            int totalCount = 0;
            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@PageIndex", pageIndex);
                paramCollection.AddWithValue("@PageSize", pageSize);
                paramCollection.AddWithValue("@ClientId", clientId);
            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startOfIndex = 0;
                Appointment model = MapSingleAppointment(reader, ref startOfIndex);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startOfIndex++);
                }

                if (result == null)
                {
                    result = new List<Appointment>();
                }

                result.Add(model);
            });

            if (result != null)
            {
                pagedResult = new Paged<Appointment>(result, pageIndex, pageSize, totalCount);
            }

            return pagedResult;
        }


        private Appointment MapSingleAppointment(IDataReader reader, ref int index)
        {
            Appointment model = new Appointment();

            model.Id = reader.GetSafeInt32(index++);
            model.AppointmentType = _lookUpService.MapSingleLookUp(reader, ref index);
            model.StatusType = _lookUpService.MapSingleLookUp(reader, ref index);
            model.Client = new User();
            model.Client.Id = reader.GetSafeInt32(index++);
            model.Client.FirstName = reader.GetSafeString(index++);
            model.Client.LastName = reader.GetSafeString(index++);
            model.Client.Mi = reader.GetSafeString(index++);
            model.Client.Email = reader.GetSafeString(index++);
            model.Client.AvatarUrl = reader.GetSafeString(index++);
            model.IsConfirmed = reader.GetSafeBool(index++);
            model.TeamMember = new User();
            model.TeamMember.Id = reader.GetSafeInt32(index++);
            model.TeamMember.FirstName = reader.GetSafeString(index++);
            model.TeamMember.LastName = reader.GetSafeString(index++);
            model.TeamMember.Mi = reader.GetSafeString(index++);
            model.TeamMember.Email = reader.GetSafeString(index++);
            model.TeamMember.AvatarUrl = reader.GetSafeString(index++);
            model.Notes = reader.GetSafeString(index++);
            model.Location = new Location();
            model.Location.Id = reader.GetSafeInt32(index++);
            model.Location.LineOne = reader.GetSafeString(index++);
            model.Location.LineTwo = reader.GetSafeString(index++);
            model.Location.City = reader.GetSafeString(index++);
            model.Location.Zip = reader.GetSafeString(index++);
            model.AppointmentStart = reader.GetSafeDateTime(index++);
            model.AppointmentEnd = reader.GetSafeDateTime(index++);
            model.DateCreated = reader.GetSafeDateTime(index++);
            model.DateModified = reader.GetSafeDateTime(index++);
            model.CreatedBy = _userMapper.MapUser(reader, ref index);
            model.ModifiedBy = _userMapper.MapUser(reader, ref index);

            return model;
        }
    }
}
