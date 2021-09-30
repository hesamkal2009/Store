using Domain.Common;
using Domain.Entities;

namespace Domain.Events.FoodEvents
{
    public class FoodStockRechargedEvent : DomainEvent
    {
        public FoodStockRechargedEvent(Food food)
        {
            Food = food;
        }

        public Food Food { get; }
    }
}
