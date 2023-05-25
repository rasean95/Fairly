import { lazy } from "react";

const Appointments = lazy(() =>
  import("../components/appointments/AppointmentsList")
);

const AppointmentForm = lazy(() =>
  import("../components/appointments/AppointmentForm")
);

const appointmentRoutes = [
  {
    path: "/dashboard/appointments/list",
    name: "Appointments List",
    element: Appointments,
    roles: ["Candidate", "HiringAdmin", "SysAdmin"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/dashboard/appointments/new",
    name: "Create Appointment Form",
    element: AppointmentForm,
    roles: ["HiringAdmin", "SysAdmin"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/dashboard/appointments/:id",
    name: "Update Appointment Form",
    element: AppointmentForm,
    roles: ["HiringAdmin", "SysAdmin"],
    exact: true,
    isAnonymous: false,
  },
];

export default appointmentRoutes;
