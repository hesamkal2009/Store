using FluentValidation;
using System;
using System.Collections.Generic;
using System.Security.Claims;

namespace Application.Common.Models.Identity
{
    public class UserDto
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string NormalizedUserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string NormalizedEmail { get; set; }
        public bool EmailConfirmed { get; set; }
        public string PhoneNumber { get; set; }
        public bool PhoneNumberConfirmed { get; set; }
        public string SecurityStamp { get; set; }
        public string ConcurrencyStamp { get; set; }
        public bool TwoFactorEnabled { get; set; }
        public bool LockoutEnabled { get; set; }
        public DateTimeOffset? LockoutEnd { get; set; }
        public int AccessFailedCount { get; set; }

        public IList<Claim> claims { get; set; } = new List<Claim>();
        public IList<string> Roles { get; set; } = new List<string>();
    }

    public class UserDtoValidator : AbstractValidator<UserDto>
    {
        public UserDtoValidator()
        {
            RuleFor(o => o.UserName).MaximumLength(250).NotEmpty().NotNull();
            RuleFor(o => o.Password).MaximumLength(250).NotEmpty().NotNull();
        }
    }
}