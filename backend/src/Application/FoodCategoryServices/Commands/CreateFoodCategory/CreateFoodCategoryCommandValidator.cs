using FluentValidation;

namespace Application.FoodCategoryServices.Commands.CreateFoodCategory
{
    public class CreateFoodCategoryCommandValidator : AbstractValidator<CreateFoodCategoryCommand>
    {
        public CreateFoodCategoryCommandValidator()
        {
            RuleFor(v => v.Name)
                .MaximumLength(200).NotEmpty().NotNull().WithMessage("احراز شرایط ثبت این فیلد نام الزامی است");

            RuleFor(v => v.IsActive)
                .NotEmpty().NotNull().WithMessage("احراز شرایط ثبت این فیلد اکتیو الزامی است");
        }
    }
}
