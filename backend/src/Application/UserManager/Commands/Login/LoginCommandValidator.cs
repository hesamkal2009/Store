using FluentValidation;

namespace Application.UserManager.Commands.Login
{
    public class LoginCommandValidator : AbstractValidator<LoginCommand>
    {
        public LoginCommandValidator()
        {
            RuleFor(o => o.Email)
                .EmailAddress()
                .NotEmpty()
                .NotNull();

            RuleFor(o => o.Password)
                //TODO: .MinimumLength(8)
                .NotEmpty()
                .NotNull();
        }
    }
}