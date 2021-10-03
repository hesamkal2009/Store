using Application.UserManager.Commands.Login;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Web.API.Controllers;

namespace Store.Web.API.Controllers
{
    [ApiController]
    [AllowAnonymous]
    [Route("api/[controller]")]
    public class UserManagerController : ApiController
    {
        [HttpPost]
        public async Task<ActionResult<string>> Login([FromBody] LoginCommand command)
        {
            return await Mediator.Send(command);
        }
    }
}