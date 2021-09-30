using FluentValidation;

namespace Application.FoodCategoryServices.Commands.UpdateFoodCategory
{
    public class UpdateFoodCategoryCommandValidator : AbstractValidator<UpdateFoodCategoryCommand>
    {
        public UpdateFoodCategoryCommandValidator()
        {
            RuleFor(v => v.Id)
                .NotEmpty().NotNull().WithMessage("احراز شرایط ثبت این فیلد Id الزامی است");

            RuleFor(v => v.Name)
                .MaximumLength(200).NotEmpty().NotNull().WithMessage("احراز شرایط ثبت این فیلد نام الزامی است");

            RuleFor(v => v.IsActive)
                .NotEmpty().NotNull().WithMessage("احراز شرایط ثبت این فیلد اکتیو الزامی است");
        }
    }
}
