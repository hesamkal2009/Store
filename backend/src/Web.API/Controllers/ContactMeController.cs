using Application.Common.Models;
using Application.ContactMeService.Commands.CreateContactMe;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Web.API.Controllers;

namespace Store.Web.API.Controllers
{
    [ApiController]
    [AllowAnonymous]
    [Route("api/[controller]")]
    public class ContactMeController : ApiController
    {
        [HttpPost]
        public async Task<ActionResult<Result>> Create(ContactMeCommand command)
        {
            return await Mediator.Send(command);
        }
    }
}
