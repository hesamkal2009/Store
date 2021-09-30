using Application.Common.Interfaces;
using Application.Common.Mappings;
using Application.Common.Models;
using Application.FoodCategoryServices.Queries.GetFoodCategories;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.FoodCategoryServices.Queries.GetFoodCategoriesWithPagination
{
    public class GetFoodCategoriesWithPaginationQuery : IRequest<PaginatedList<FoodCategoryDto>>
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }

    public class GetFoodCategoriesWithPaginationQueryHandler : IRequestHandler<GetFoodCategoriesWithPaginationQuery, PaginatedList<FoodCategoryDto>>
    {
        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;

        public GetFoodCategoriesWithPaginationQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<PaginatedList<FoodCategoryDto>> Handle(GetFoodCategoriesWithPaginationQuery request, CancellationToken cancellationToken)
        {
            return await _context.FoodCategories
                .ProjectTo<FoodCategoryDto>(_mapper.ConfigurationProvider)
                .PaginatedListAsync(request.PageNumber, request.PageSize);
        }
    }
}
