import axios from "axios";
import * as helper from '../services/serviceHelpers';

const apptsEndpoint = `${helper.API_HOST_PREFIX}/api/appointments`;

const getAppointments = (pageIndex, pageSize, clientId) => {
    const config = {
        method: "GET",
        url: `${apptsEndpoint}/clientId?pageIndex=${pageIndex}&pageSize=${pageSize}&clientId=${clientId}`,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const appointmentsService = { getAppointments };

export default appointmentsService;
