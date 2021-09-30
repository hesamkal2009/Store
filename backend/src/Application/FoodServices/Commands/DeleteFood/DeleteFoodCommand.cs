using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.FoodServices.Commands.DeleteFood
{
    public class DeleteFoodCommand : IRequest
    {
        public int Id { get; set; }
    }

    public class DeleteFoodCommandHandler : IRequestHandler<DeleteFoodCommand>
    {
        public DeleteFoodCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        private readonly IApplicationDbContext _context;

        public async Task<Unit> Handle(DeleteFoodCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.FoodCategories.FindAsync(request.Id);

            if (entity == null)
            {
                throw new NotFoundException(nameof(Food), request.Id);
            }

            _context.FoodCategories.Remove(entity);

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
