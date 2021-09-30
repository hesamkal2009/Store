using FluentValidation;

namespace Application.FoodServices.Commands.DeleteFood
{
    public class DeleteFoodCommandValidator : AbstractValidator<DeleteFoodCommand>
    {
        public DeleteFoodCommandValidator()
        {
            RuleFor(o => o.Id)
                .NotEmpty().NotNull().WithMessage("ورود Id الزامی است");
        }
    }
}
