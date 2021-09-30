using Application.Common.Interfaces;
using Domain.Entities;
using Domain.Enums;
using Domain.Events.FoodEvents;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.FoodServices.Commands.CreateFood
{

    public class CreateFoodCommand : IRequest<int>
    {
        public int foodCategoryId { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public FoodInventoryStatus FoodInventoryStatusId { get; set; }
    }

    public class CreateFoodCommandHandler : IRequestHandler<CreateFoodCommand, int>
    {
        public CreateFoodCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        private readonly IApplicationDbContext _context;

        public async Task<int> Handle(CreateFoodCommand request, CancellationToken cancellationToken)
        {
            var entity = new Food()
            {
                Name = request.Name,
                Price = request.Price,
                FoodCategoryId = request.foodCategoryId,
            };

            entity.DomainEvents.Add(new FoodCreatedEvent(entity));

            _context.Foods.Add(entity);

            await _context.SaveChangesAsync(cancellationToken);

            return entity.Id;
        }
    }
}
