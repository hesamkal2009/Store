using FluentValidation;

namespace Application.FoodCategoryServices.Commands.DeleteFoodCategory
{
    public class DeleteFoodCategoryCommandValidator : AbstractValidator<DeleteFoodCategoryCommand>
    {
        public DeleteFoodCategoryCommandValidator()
        {
            RuleFor(o => o.Id)
                .NotEmpty().NotNull().WithMessage("ورود Id الزامی است");
        }
    }
}
