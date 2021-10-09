using Application.Common.Interfaces;
using Application.Common.Models;
using Application.Common.Models.Identity;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.UserManager.Commands.Register
{
    public class RegisterCommand : IRequest<Result>
    {
        public string Email { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string PhoneNumber { get; set; }

        public List<ClaimDto> claims { get; set; } = new List<ClaimDto>();
        public List<string> Roles { get; set; } = new List<string>();
    }

    public class RegisterCommandHandler : IRequestHandler<RegisterCommand, Result>
    {
        public RegisterCommandHandler(IIdentityService identityService)
        {
            _identityService = identityService;
        }

        private readonly IIdentityService _identityService;

        public async Task<Result> Handle(RegisterCommand request, CancellationToken cancellationToken)
        {
            return Result.Success();
        }
    }
}