using Application.Common.Models;
using Application.UserManager.Commands.Login;
using Application.UserManager.Commands.Register;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Web.API.Controllers;

namespace Store.Web.API.Controllers
{
    [ApiController]
    [AllowAnonymous]
    [Route("api/[controller]")]
    [EnableCors("CorsPolicy")]
    public class UserManagerController : ApiController
    {
        [HttpPost]
        [Route("Login")]
        public async Task<ActionResult<LoginViewModel>> Login([FromBody] LoginCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpPost]
        [Route("Register")]
        public async Task<ActionResult<Result>> Restier([FromBody] RegisterCommand command)
        {
            return await Mediator.Send(command);
        }
    }
}