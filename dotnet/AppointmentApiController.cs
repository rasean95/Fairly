using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Framework;
using Microsoft.Extensions.Logging;
using Fairly.Models;
using Fairly.Models.Domain.Appointment;
using Fairly.Models.Requests.Appointments;
using Fairly.Services;
using Fairly.Services.Interfaces;
using Fairly.Web.Controllers;
using Fairly.Web.Models.Responses;
using System;
using System.Collections.Generic;

namespace Fairly.Web.Api.Controllers
{
    [Route("api/appointments")]
    [ApiController]
    public class AppointmentApiController : BaseApiController
    {
        private IAppointmentService _service = null;
        private IAuthenticationService<int> _authService = null;

        public AppointmentApiController(IAppointmentService service, ILogger<AppointmentService> logger, IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }


        [HttpGet("clientId")]
        public ActionResult<ItemResponse<Paged<Appointment>>> GetByClientId(int pageindex, int pageSize, int clientId)
        {
            BaseResponse response = null;

            int code = 200;

            try
            {
                Paged<Appointment> page = _service.GetAppointmentByClientId(pageindex, pageSize, clientId);
                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("Appointment not found");
                }
                else
                {
                    response = new ItemResponse<Paged<Appointment>>() { Item = page };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }
    }
}
