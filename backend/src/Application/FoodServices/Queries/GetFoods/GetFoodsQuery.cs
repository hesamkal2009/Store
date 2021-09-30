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

namespace Application.FoodServices.Queries.GetFoods
{
    public class GetFoodsQuery : IRequest<FoodViewModel>
    {

    }


    public class GetFoodsQueryHandler : IRequestHandler<GetFoodsQuery, FoodViewModel>
    {

        public GetFoodsQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        private readonly IMapper _mapper;
        private readonly IApplicationDbContext _context;

        public async Task<FoodViewModel> Handle(GetFoodsQuery request, CancellationToken cancellationToken)
        {
            return new FoodViewModel
            {
                FoodInventoryStatuses = Enum.GetValues(typeof(FoodInventoryStatus))
                    .Cast<FoodInventoryStatus>()
                    .Select(s => new FoodInventoryStatusDto { Value = (int)s, Name = s.ToString() })
                    .ToList(),

                FoodList = await _context.Foods
                    .ProjectTo<FoodDto>(_mapper.ConfigurationProvider)
                    .OrderBy(f => f.Name)
                    .ToListAsync()
            };
        }
    }
}
