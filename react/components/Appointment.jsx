import React from "react";
import { Badge } from "react-bootstrap";
import PropTypes from "prop-types";
import { BsFillTrashFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { GiConfirmed } from "react-icons/gi";
import "./appointmentsStyle.css";
import debug from "fairly-debug";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import moment from "moment";

const Appointment = ({
  appointment,
  onDeleteClicked,
  userRole,
  onHandleConfirmation,
}) => {
  const _logger = debug.extend("Appointments");
  const navigate = useNavigate();

  const onLocalConfirm = () => {
    onHandleConfirmation(appointment);
  };

  const onLocalDelete = () => {
    onDeleteClicked(appointment);
  };

  const onLocalEdit = () => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "This will update the appointment details!",
      showCancelButton: true,
      confirmButtonText: "Update",
    })
      .then((result) => {
        if (result.isConfirmed) {
          let state = { type: "update", payload: appointment };
          _logger("appointment to edit", state);
          navigate(`/dashboard/appointments/${appointment.id}`, { state });
        }
      })
      .catch((err) => {
        if (err) {
          Swal.fire("Error.", "Appointment was not updated.", "error");
        }
      });
  };

  const onToggleColors = (color) => {
    if (color === "Active") {
      return "success";
    } else if (color === "Removed") {
      return "secondary";
    } else if (color === "Inactive") {
      return "danger";
    } else if (color === "Pending") {
      return "primary";
    } else if (color === "Flagged") {
      return "warning";
    }
  };

  return (
    <tr key={"List-A" + appointment.id}>
      <td className="text-md-center">
        {appointment.client.firstName} {appointment.client.lastName}
      </td>
      <td className="text-md-center">{appointment.client.email}</td>
      <td className="text-md-center">{appointment.appointmentType.name}</td>
      <td className="text-md-center">
        <Badge
          onChange={onToggleColors}
          bg={onToggleColors(appointment.statusType.name)}
        >
          {appointment.statusType.name}
        </Badge>
      </td>
      <td className="text-md-center">{appointment.location.lineOne}</td>
      <td className="text-md-center">
        {appointment.teamMember.firstName} {appointment.teamMember.lastName}
      </td>
      <td className="text-md-center">
        {moment(appointment.appointmentStart).format("MMM Do YYYY")}
      </td>
      <td className="text-md-center">
        {moment(appointment.appointmentStart).format("LT")}
      </td>
      <td className="text-md-center">
        {moment(appointment.appointmentEnd).format("LT")}
      </td>
      {userRole.includes("HiringAdmin") || userRole.includes("SysAdmin") ? (
        <td className="text-md-center">
          <FiEdit
            cursor="pointer"
            className="iconsize"
            onClick={onLocalEdit}
          ></FiEdit>
          <BsFillTrashFill
            cursor="pointer"
            className="iconsize"
            onClick={onLocalDelete}
          ></BsFillTrashFill>
        </td>
      ) : (
        <td className="text-md-center">
          <GiConfirmed
            cursor="pointer"
            className="iconsize"
            onClick={onLocalConfirm}
          ></GiConfirmed>
        </td>
      )}
    </tr>
  );
};

Appointment.propTypes = {
  userRole: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string]))
    .isRequired,
  onDeleteClicked: PropTypes.func.isRequired,
  onHandleConfirmation: PropTypes.func.isRequired,
  appointment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    client: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      mi: PropTypes.string,
      lastName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
    teamMember: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      mi: PropTypes.string,
      lastName: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
    }).isRequired,
    appointmentStart: PropTypes.string.isRequired,
    appointmentEnd: PropTypes.string.isRequired,
    appointmentType: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      id: PropTypes.number.isRequired,
      lineOne: PropTypes.string.isRequired,
    }).isRequired,
    statusType: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default React.memo(Appointment);
