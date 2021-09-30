using FluentValidation;

namespace Application.FoodServices.Commands.CreateFood
{
    public class CreateFoodCommandValidator : AbstractValidator<CreateFoodCommand>
    {
        public CreateFoodCommandValidator()
        {
            RuleFor(v => v.Name)
                .MaximumLength(200).NotEmpty().NotNull().WithMessage("احراز شرایط ثبت این فیلد نام الزامی است");

            RuleFor(v => v.FoodInventoryStatusId)
                .IsInEnum().NotEmpty().NotNull().WithMessage("احراز شرایط ثبت این فیلد موجودی الزامی است");

            RuleFor(v => v.foodCategoryId)
                .NotEmpty().NotNull().WithMessage("احراز شرایط ثبت این فیلد دسته بندی الزامی است");

            RuleFor(v => v.Price)
                .NotEmpty().NotNull().WithMessage("احراز شرایط ثبت این فیلد قیمت الزامی است");
        }
    }
}
