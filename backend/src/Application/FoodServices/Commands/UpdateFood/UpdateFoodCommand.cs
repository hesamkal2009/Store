using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.FoodServices.Commands.UpdateFood
{
    public class UpdateFoodCommand : IRequest
    {
        public int Id { get; set; }
        public int foodCategoryId { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public FoodInventoryStatus FoodInventoryStatusId { get; set; }
    }

    public class UpdateFoodCommandHandler : IRequestHandler<UpdateFoodCommand>
    {
        public UpdateFoodCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        private readonly IApplicationDbContext _context;

        public async Task<Unit> Handle(UpdateFoodCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.Foods.FindAsync(request.Id);

            if (entity == null)
            {
                throw new NotFoundException(nameof(Food), request.Id);
            }

            entity.Name = request.Name;
            entity.FoodCategoryId = request.foodCategoryId;
            entity.Price = request.Price;
            entity.FoodInventoryStatusId = request.FoodInventoryStatusId;

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
