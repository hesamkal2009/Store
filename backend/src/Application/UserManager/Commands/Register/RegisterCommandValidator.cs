using Application.Common.Models.Identity;
using FluentValidation;

namespace Application.UserManager.Commands.Register
{
    public class RegisterCommandValidator : AbstractValidator<RegisterCommand>
    {
        public RegisterCommandValidator()
        {
            RuleFor(o => o.Email).EmailAddress().NotEmpty().NotNull();
            RuleFor(o => o.UserName).MaximumLength(250).NotEmpty().NotNull();
            RuleFor(o => o.PhoneNumber).MaximumLength(11).MinimumLength(11).NotEmpty().NotNull();
            RuleFor(o => o.Password).MinimumLength(8).NotEmpty().NotNull();
        }
    }
}