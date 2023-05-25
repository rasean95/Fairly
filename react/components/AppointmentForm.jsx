import React, { useState, useEffect, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import debug from "fairly-debug";
import appointmentsService from "../../services/appointmentService";
import appointmentSchema from "../../schemas/appointmentSchema";
import { useNavigate, useLocation } from "react-router-dom";
import { getTypes } from "../../services/lookUpService";
import "./appointmentsStyle.css";
import toastr from "toastr";
import moment from "moment-timezone";

const AppointmentForm = () => {
  const _logger = debug.extend("Form");
  const navigate = useNavigate();
  const { state } = useLocation();
  const formikProps = useRef();

  const [userFormData, setUserFormData] = useState({
    id: 0,
    appointmentTypeId: 0,
    clientId: 0,
    teamMemberId: 0,
    notes: "",
    locationId: 0,
    isConfirmed: false,
    appointmentStart: "",
    appointmentEnd: "",
    statusTypesId: 3,
    isUpdating: false,
  });

  const [selectOptions, setSelectedOptions] = useState({
    apptTypes: [],
    statusTypes: [],
    apptInfoId: 5,
    aClient: "",
    clientNum: 0,
    aTeamMember: "",
    teamMemberNum: 0,
    aLocation: "",
    locationNum: 0,
  });

  useEffect(() => {
    if (state?.type === "update") {
      setUserFormData((prevState) => {
        const newSt = { ...prevState };
        newSt.id = state.payload.id;
        newSt.appointmentTypeId = state.payload.appointmentType.id;
        newSt.clientId = state.payload.client.id;
        newSt.teamMemberId = state.payload.teamMember.id;
        newSt.notes = state.payload.notes;
        newSt.locationId = state.payload.location.id;
        newSt.isConfirmed = state.payload.isConfirmed;
        newSt.appointmentStart = state.payload.appointmentStart;
        newSt.appointmentEnd = state.payload.appointmentEnd;
        newSt.statusTypesId = state.payload.statusType.id;
        newSt.isUpdating = true;
        return newSt;
      });
    }
  }, []);

  useEffect(() => {
    _logger("firing up");
    getTypes(["AppointmentTypes", "StatusTypes"])
      .then(onGetTypesSuccess)
      .catch(onGetTypesError);

    appointmentsService
      .getApptInfo(selectOptions.apptInfoId)
      .then(onGetApptInfoSuccess)
      .catch(onGetApptInfoError);
  }, []);

  const mapStatusType = (statType) => {
    return (
      <option value={statType.id} key={`statType_${statType.id}`}>
        {statType.name}
      </option>
    );
  };

  const mapApptType = (apptType) => {
    return (
      <option value={apptType.id} key={`apptType_${apptType.id}`}>
        {apptType.name}
      </option>
    );
  };

  const onHandleSubmit = (values) => {
    _logger("onSubmit", values);
    _logger("Null ? adding : editing", state);
    values.appointmentTypeId = parseInt(values.appointmentTypeId);
    values.clientId = parseInt(values.clientId);
    values.teamMemberId = parseInt(values.teamMemberId);
    values.locationId = parseInt(values.locationId);
    values.statusTypesId = parseInt(values.statusTypesId);
    if (!!userFormData.isUpdating) {
      appointmentsService
        .updateAppointment(values)
        .then(onUpdateSuccess)
        .catch(onUpdateError);
      _logger("Updated", values);
    } else {
      appointmentsService
        .addAppointment(values)
        .then(onAddSuccess)
        .catch(onAddError);
      _logger("Added", values);
    }
  };

  const onHandleTimeChange = (e) => {
    let datePicked = new Date(e.target.value);
    datePicked.setHours(datePicked.getHours() - 7);
    formikProps.current.setFieldValue(
      "appointmentStart",
      datePicked.toISOString().substring(0, 16).split(".")[0]
    );
    formikProps.current.setFieldValue(
      "appointmentEnd",

      new Date(datePicked.setMinutes(datePicked.getMinutes() + 30))
        .toISOString()
        .substring(0, 16)
        .split(".")[0]
    );
  };

  const disablePastDates = () => {
    const date = moment(new Date());
    const dateTime = date.tz("America/Los_Angeles").format("YYYY-MM-DDThh:mm");
    if (dateTime >= userFormData.appointmentStart) {
      _logger(dateTime);
      return dateTime;
    }
  };

  const onGetApptInfoSuccess = (response) => {
    _logger(response, "onGetApptInfoSuccess");

    setSelectedOptions((prevState) => {
      const newSt = { ...prevState };
      newSt.clientNum = response.item.client.id;
      newSt.aClient =
        response.item.client.firstName + " " + response.item.client.lastName;
      newSt.teamMemberNum = response.item.teamMember.id;
      newSt.aTeamMember =
        response.item.teamMember.firstName +
        " " +
        response.item.teamMember.lastName;
      newSt.locationNum = response.item.location.id;
      newSt.aLocation = response.item.location.lineOne;

      return newSt;
    });
  };

  const onGetApptInfoError = (err) => {
    _logger(err, "onGetApptInfoError");

    toastr.error("Could not display appt info.");
  };

  const onGetTypesSuccess = (response) => {
    _logger(response, "lookup success");

    setSelectedOptions((prevState) => {
      const newSt = { ...prevState };
      newSt.apptTypes = response.item.appointmentTypes.map(mapApptType);
      newSt.statusTypes = response.item.statusTypes.map(mapStatusType);

      return newSt;
    });
  };

  const onGetTypesError = (err) => {
    _logger(err, "lookUp error");

    toastr.error("Could not display types.");
  };

  return (
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-lg-8 col-xl-6">
          <div className="card rounded-3">
            <div className="card-body p-4 p-md-5">
              <h2 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2 text-md-center text-success">
                {!!userFormData.isUpdating
                  ? "Modify Appointment"
                  : "Create Appointment"}
              </h2>
              <Formik
                enableReinitialize={true}
                initialValues={userFormData}
                validationSchema={appointmentSchema}
                onSubmit={onHandleSubmit}
                innerRef={formikProps}
              >
                {({ values }) => (
                  <Form className="px-md-2">
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="clientId" />
                      Client
                      <Field
                        id="clientId"
                        component="select"
                        className="form-select"
                        name="clientId"
                        placeholder="Please Enter Client Info"
                      >
                        <option>Please Select Client</option>
                        <option value={selectOptions.clientNum}>
                          {selectOptions.aClient}
                        </option>
                      </Field>
                      <ErrorMessage
                        name="clientId"
                        component="div"
                        className="haserror"
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="teamMemberId" />
                      Team Member
                      <Field
                        id="teamMemberId"
                        component="select"
                        className="form-select"
                        name="teamMemberId"
                        placeholder="Please Enter Team Member Info"
                      >
                        <option>Please Select Team Member</option>
                        <option value={selectOptions.teamMemberNum}>
                          {selectOptions.aTeamMember}
                        </option>
                      </Field>
                      <ErrorMessage
                        name="teamMemberId"
                        component="div"
                        className="haserror"
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="locationId" />
                      Location
                      <Field
                        id="locationId"
                        component="select"
                        className="form-select"
                        name="locationId"
                      >
                        <option>Please Select Location</option>
                        <option value={selectOptions.locationNum}>
                          {selectOptions.aLocation}
                        </option>
                      </Field>
                      <ErrorMessage
                        name="locationId"
                        component="div"
                        className="haserror"
                      />
                    </div>
                    {!!userFormData.isUpdating && (
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="statusTypesId" />
                        Appointment Status
                        <Field
                          id="statusTypesId"
                          component="select"
                          className="form-select"
                          name="statusTypesId"
                        >
                          {selectOptions.statusTypes}
                        </Field>
                        <ErrorMessage
                          name="statusTypesId"
                          component="div"
                          className="haserror"
                        />
                      </div>
                    )}
                    <div className="form-outline mb-4">
                      <label
                        className="form-label"
                        htmlFor="appointmentTypeId"
                      />
                      Appointment Type
                      <Field
                        id="appointmentTypeId"
                        component="select"
                        className="form-select"
                        name="appointmentTypeId"
                        placeholder="Enter Appointment Type"
                      >
                        <option>Please Select Appointment Type</option>
                        {selectOptions.apptTypes}
                      </Field>
                      <ErrorMessage
                        name="appointmentTypeId"
                        component="div"
                        className="haserror"
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label
                        className="form-label"
                        htmlFor="appointmentStart"
                      />
                      Appointment Start Time
                      <Field
                        id="appointmentStart"
                        type="datetime-local"
                        className="form-control"
                        name="appointmentStart"
                        min={disablePastDates()}
                        onChange={onHandleTimeChange}
                      />
                      <ErrorMessage
                        name="appointmentStart"
                        component="div"
                        className="haserror"
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="appointmentEnd" />
                      Appointment End Time
                      <Field
                        id="appointmentEnd"
                        type="datetime-local"
                        className="form-control"
                        name="appointmentEnd"
                        min={disablePastDates()}
                      />
                      <ErrorMessage
                        name="appointmentEnd"
                        component="div"
                        className="haserror"
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="notes" />
                      Notes
                      <Field
                        id="notes"
                        component="textarea"
                        className="form-control"
                        name="notes"
                        placeholder="Please Enter Notes"
                        maxLength={2000}
                      />
                      <ErrorMessage
                        name="notes"
                        component="div"
                        className="haserror"
                      />
                    </div>
                    {!!userFormData.isUpdating && (
                      <div className="form-outline mb-4">
                        <label
                          className="form-check-label input"
                          htmlFor="isConfirmed"
                        />
                        Is Appointment Confirmed?
                        <div>
                          {values.isConfirmed}
                          <Field
                            id="isConfirmed"
                            type="checkbox"
                            className="form-check-input checkboxsize"
                            name="isConfirmed"
                          />
                        </div>
                        <ErrorMessage
                          name="isConfirmed"
                          component="div"
                          className="haserror"
                        />
                      </div>
                    )}
                    <button
                      type="submit"
                      className="btn btn-success btn-lg mb-1 float-start"
                    >
                      {userFormData.isUpdating === true ? "Update" : "Submit"}
                    </button>
                    {userFormData.isUpdating === false && (
                      <button
                        type="reset"
                        className="btn btn-danger btn-lg mb-1 float-end"
                      >
                        Clear
                      </button>
                    )}
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;
