using System.Collections.Generic;

namespace Application.FoodServices.Queries.GetFoods
{
    public class FoodViewModel
    {
        public IList<FoodInventoryStatusDto> FoodInventoryStatuses { get; set; }

        public IList<FoodDto> FoodList { get; set; }
    }
}