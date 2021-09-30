using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.FoodCategoryServices.Commands.DeleteFoodCategory
{
    public class DeleteFoodCategoryCommand : IRequest
    {
        public int Id { get; set; }
    }

    public class DeleteFoodCategoryCommandHandler : IRequestHandler<DeleteFoodCategoryCommand>
    {
        public DeleteFoodCategoryCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        private readonly IApplicationDbContext _context;

        public async Task<Unit> Handle(DeleteFoodCategoryCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.FoodCategories.FindAsync(request.Id);

            if (entity == null)
            {
                throw new NotFoundException(nameof(FoodCategory), request.Id);
            }

            _context.FoodCategories.Remove(entity);

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
