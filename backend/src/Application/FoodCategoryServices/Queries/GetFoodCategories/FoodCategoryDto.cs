using Application.Common.Mappings;
using Domain.Entities;

namespace Application.FoodCategoryServices.Queries.GetFoodCategories
{
    public class FoodCategoryDto : IMapFrom<FoodCategory>
    {
        public int Id { get; set; }
        public bool IsActive { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}