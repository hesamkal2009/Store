using Application.Common.Mappings;
using Domain.Entities;
using Domain.Enums;

namespace Application.FoodServices.Queries.GetFoods
{
    public class FoodDto : IMapFrom<Food>
    {
        public int Id { get; set; }
        public int FoodCategoryId { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public FoodInventoryStatus FoodInventoryStatus { get; set; }

    }
}