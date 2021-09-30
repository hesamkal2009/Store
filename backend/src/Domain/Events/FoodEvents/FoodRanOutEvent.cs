using Domain.Common;
using Domain.Entities;

namespace Domain.Events.FoodEvents
{
    public class FoodRanOutEvent : DomainEvent
    {
        public FoodRanOutEvent(Food food)
        {
            Food = food;
        }

        public Food Food { get; }
    }
}
