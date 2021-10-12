using Application.Common.Interfaces;
using Ardalis.GuardClauses;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.UserManager.Commands.Login
{
    public class LoginCommand : IRequest<LoginViewModel>
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public bool RememberMe { get; set; }
    }

    public class LoginCommandHandler : IRequestHandler<LoginCommand, LoginViewModel>
    {
        public LoginCommandHandler(IIdentityService identityService)
        {
            _identityService = identityService;
        }

        private readonly IIdentityService _identityService;

        public async Task<LoginViewModel> Handle(LoginCommand request, CancellationToken cancellationToken)
        {
            var userId = await _identityService.FindUserIdAsync(request.Email, request.Password);

            Guard.Against.NullOrWhiteSpace(userId, nameof(userId), "User with specified email doesn't exists.");

            return new LoginViewModel { IdentityToken = await _identityService.GenerateToken(userId, request.RememberMe) };
        }
    }
}