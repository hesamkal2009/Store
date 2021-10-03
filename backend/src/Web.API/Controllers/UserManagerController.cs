using Application.Common.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Web.API.Controllers;

namespace Store.Web.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserManagerController : ApiController
    {
        [HttpPost]
        public async Task<ActionResult<Result>> Login([FromBody] string email, string password)
        {
            return Result.Success();
        }
    }
}