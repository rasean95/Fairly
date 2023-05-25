import * as Yup from "yup";
import moment from "moment-timezone";

const appointmentSchema = Yup.object().shape({
  clientId: Yup.number().min(1, "A selection is required.").required("Client is required."),
  teamMemberId: Yup.number().min(1, "A selection is required.").required("Team member is required."),
  locationId: Yup.number().min(1, "A selection is required.").required("Location is required."),
  statusTypesId: Yup.number().min(1, "A selection is required.").required("Appointment status is required."),
  appointmentTypeId: Yup.number().min(1, "A selection is required.").required("Appointment type is required."),
  appointmentStart: Yup.date()
    .min(moment().tz("America/Los_Angeles"), "Start time must be greater than or equal to the current local time.")
    .required("Appointment start time is required."),
  appointmentEnd: Yup.date()
    .when("appointmentStart", (appointmentStart, appointmentSchema) => {
      if (appointmentStart) {
        const minEndTime = moment(appointmentStart).add(30, "minutes");
        return appointmentSchema.min(minEndTime, "End time must be at least 30 minutes or more after the start time.");
      }
      return appointmentSchema;
    }).required("Appointment end time is required."),
  notes: Yup.string().min(2, "Must enter more than 1 character.").max(1999, "No more than 2000 characters can be entered.").nullable(),
  isConfirmed: Yup.bool(),
});

export default appointmentSchema;
