using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.FoodCategoryServices.Queries.GetFoodCategories
{
    public class GetFoodCategoriesQuery : IRequest<FoodCategoryViewModel>
    {

    }


    public class GetFoodCategoriesQueryHandler : IRequestHandler<GetFoodCategoriesQuery, FoodCategoryViewModel>
    {

        public GetFoodCategoriesQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;

        public async Task<FoodCategoryViewModel> Handle(GetFoodCategoriesQuery request, CancellationToken cancellationToken)
        {
            return new FoodCategoryViewModel
            {
                FoodInventoryStatuses = Enum.GetValues(typeof(FoodInventoryStatus))
                    .Cast<FoodInventoryStatus>()
                    .Select(s => new FoodInventoryStatusDto { Value = (int)s, Name = s.ToString() })
                    .ToList(),

                FoodCategoryList = await _context.FoodCategories
                    .ProjectTo<FoodCategoryDto>(_mapper.ConfigurationProvider)
                    .OrderBy(f => f.Name)
                    .ToListAsync()
            };
        }
    }
}
