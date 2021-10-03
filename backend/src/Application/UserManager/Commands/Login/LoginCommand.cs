using Application.Common.Interfaces;
using Ardalis.GuardClauses;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.UserManager.Commands.Login
{
    public class LoginCommand : IRequest<string>
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class LoginCommandHandler : IRequestHandler<LoginCommand, string>
    {
        public LoginCommandHandler(IAuthenticationManager authenticationManager, IIdentityService identityService)
        {
            _authenticationManager = authenticationManager;
            _identityService = identityService;
        }

        private readonly IAuthenticationManager _authenticationManager;
        private readonly IIdentityService _identityService;

        public async Task<string> Handle(LoginCommand request, CancellationToken cancellationToken)
        {
            var userExists = await _identityService.FindUserAsync(request.Email);

            Guard.Against.NullOrEmpty(userExists, nameof(userExists), "User with specified email doesn't exists.");

            return _authenticationManager.GenerateToken();
        }
    }
}