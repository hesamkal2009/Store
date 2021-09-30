using Application.Common.Interfaces;
using Application.Common.Mappings;
using Application.Common.Models;
using Application.FoodServices.Queries.GetFoods;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.FoodServices.Queries.GetFoodsWithPaginationQuery
{
    public class GetFoodsWithPaginationQuery : IRequest<PaginatedList<FoodDto>>
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }

    public class GetFoodsWithPaginationQueryHandler : IRequestHandler<GetFoodsWithPaginationQuery, PaginatedList<FoodDto>>
    {
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;

        public GetFoodsWithPaginationQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<PaginatedList<FoodDto>> Handle(GetFoodsWithPaginationQuery request, CancellationToken cancellationToken)
        {

            return await _context.Foods
                .ProjectTo<FoodDto>(_mapper.ConfigurationProvider)
                .PaginatedListAsync(request.PageNumber, request.PageSize);
        }
    }
}
