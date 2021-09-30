using System.Collections.Generic;

namespace Application.FoodCategoryServices.Queries.GetFoodCategories
{
    public class FoodCategoryViewModel
    {
        public IList<FoodInventoryStatusDto> FoodInventoryStatuses { get; set; }

        public IList<FoodCategoryDto> FoodCategoryList { get; set; }
    }
}