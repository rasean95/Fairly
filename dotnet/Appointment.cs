using Fairly.Models.Domain.Locations;
using Fairly.Models.Domain.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fairly.Models.Domain.Appointment
{
    public class Appointment
    {
        public int Id { get; set; }

        public LookUp AppointmentType { get; set; }

        public LookUp StatusType { get; set; }

        public User Client { get; set; }

        public bool IsConfirmed { get; set; }

        public User TeamMember { get; set; }

        public string Notes { get; set; }

        public Location Location { get; set; }

        public DateTime AppointmentStart { get; set; }

        public DateTime AppointmentEnd { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime DateModified { get; set; }

        public BaseUser CreatedBy { get; set; }

        public BaseUser ModifiedBy { get; set; }
    }
}
