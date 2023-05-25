using Fairly.Models;
using Fairly.Models.Domain.Appointment;

namespace Fairly.Services.Interfaces
{
    public interface IAppointmentService
    {
        Paged<Appointment> GetAppointmentByClientId(int pageIndex, int pageSize, int clientId);
    }
}
