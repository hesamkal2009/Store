using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.FoodCategoryServices.Commands.UpdateFoodCategory
{
    public class UpdateFoodCategoryCommand : IRequest
    {
        public int Id { get; set; }
        public bool IsActive { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }

    public class UpdateFoodCategoryCommandHandler : IRequestHandler<UpdateFoodCategoryCommand>
    {
        public UpdateFoodCategoryCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        private readonly IApplicationDbContext _context;

        public async Task<Unit> Handle(UpdateFoodCategoryCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.FoodCategories.FindAsync(request.Id);

            if (entity == null)
            {
                throw new NotFoundException(nameof(FoodCategory), request.Id);
            }

            entity.Name = request.Name;
            entity.IsActive = request.IsActive;
            entity.Description = request.Description;

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
