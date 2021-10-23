using Application.Common.Interfaces;
using Application.Common.Models;
using Application.Common.Models.Identity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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
            var userDto = new UserDto
            {
                UserName = request.UserName.Trim(),
                NormalizedUserName = request.UserName.Trim().ToUpper(),
                Email = request.Email.Trim(),
                NormalizedEmail = request.Email.Trim().ToUpper(),
                EmailConfirmed = false,
                PhoneNumber = request.PhoneNumber,
                PhoneNumberConfirmed = false,
                AccessFailedCount = 0,
                LockoutEnabled = false,
                LockoutEnd = null,
                Password = request.Password.Trim(),
                SecurityStamp = null,
                ConcurrencyStamp = null,
                TwoFactorEnabled = false,
            };

            try
            {
                List<Claim> claims = new List<Claim>();
                claims?.AddRange(request.claims.Select(c => new Claim(c.ClaimType, c.ClaimValue)));

                var userResult = await _identityService.CreateUserAsync(userDto);

                if (userResult.Result.Errors.Any())
                {
                    return Result.Failure(userResult.Result.Errors);
                }

                var claimResult = await _identityService.AddClaimsToUser(userResult.UserId, claims);

                var roleResult = await _identityService.AddUserToRolesAsync(userResult.UserId, request.Roles);

                return userResult.Result.Succeeded
                && roleResult.Result.Succeeded
                && claimResult.Result.Succeeded
                ? Result.Success()
                : Result.Failure(new string[] { "User Creation Failed with Errors!" });
            }
            catch (Exception ex)
            {
                return Result.Failure(new string[] { ex.Message });
            }
        }
    }
}