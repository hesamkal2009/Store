using FluentValidation;

namespace Application.Common.Models.Identity
{
    public class ClaimDto
    {
        public string ClaimType { get; set; }
        public string ClaimValue { get; set; }
    }

    public class ClaimDtoValidator : AbstractValidator<ClaimDto>
    {
        public ClaimDtoValidator()
        {
            RuleFor(o => o.ClaimType).MaximumLength(250).NotEmpty().NotNull();
            RuleFor(o => o.ClaimValue).MaximumLength(250).NotEmpty().NotNull();
        }
    }
}