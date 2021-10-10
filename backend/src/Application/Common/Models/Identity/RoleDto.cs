using FluentValidation;

namespace Application.Common.Models.Identity
{
    public class RoleDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string NormalizedName { get; set; }
        public string ConcurrencyStamp { get; set; }
    }

    public class RoleDtoValidator : AbstractValidator<RoleDto>
    {
        public RoleDtoValidator()
        {
            RuleFor(o => o.Name).MaximumLength(250).NotEmpty().NotNull();
        }
    }
}