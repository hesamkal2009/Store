using Application.Common.Interfaces;
using Domain.Entities;
using Domain.Events.FoodCategoryEvents;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.FoodCategoryServices.Commands.CreateFoodCategory
{

    public class CreateFoodCategoryCommand : IRequest<int>
    {
        public bool IsActive { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }

    public class CreateFoodCategoryCommandHandler : IRequestHandler<CreateFoodCategoryCommand, int>
    {
        public CreateFoodCategoryCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        private readonly IApplicationDbContext _context;

        public async Task<int> Handle(CreateFoodCategoryCommand request, CancellationToken cancellationToken)
        {
            var entity = new FoodCategory()
            {
                IsActive = request.IsActive,
                Name = request.Name,
                Description = request.Description
            };

            entity.DomainEvents.Add(new FoodCategoryCreatedEvent(entity));

            _context.FoodCategories.Add(entity);

            await _context.SaveChangesAsync(cancellationToken);

            return entity.Id;
        }
    }
}
