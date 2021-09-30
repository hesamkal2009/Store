using FluentValidation;

namespace Application.FoodServices.Commands.UpdateFood
{
    public class UpdateFoodCommandValidator : AbstractValidator<UpdateFoodCommand>
    {
        public UpdateFoodCommandValidator()
        {
            RuleFor(v => v.Id)
                .NotEmpty().NotNull().WithMessage("احراز شرایط ثبت این فیلد Id الزامی است");

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
