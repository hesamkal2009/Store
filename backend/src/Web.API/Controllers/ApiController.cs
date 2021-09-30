using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace Web.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public abstract class ApiController : ControllerBase
    {
        private IMediator _mediatR;

        protected IMediator Mediator => _mediatR ??= HttpContext.RequestServices.GetService<IMediator>();

    }
}
