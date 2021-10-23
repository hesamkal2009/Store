using Domain.Common;
using Domain.Enums;
using Domain.Events.FoodEvents;
using System.Collections.Generic;

namespace Domain.Entities
{
    public class Food : AuditableEntity, IHasDomainEvent
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public decimal Price { get; set; }

        public FoodCategory FoodCategory { get; set; }
        public int FoodCategoryId { get; set; }


        public List<DomainEvent> DomainEvents { get; set; } = new List<DomainEvent>();


        private FoodInventoryStatus _foodInventoryStatusId;
        public FoodInventoryStatus FoodInventoryStatus
        {
            get => _foodInventoryStatusId;
            set
            {
                if (value == FoodInventoryStatus.RanOut)
                {
                    DomainEvents.Add(new FoodRanOutEvent(this));
                }

                if (value > 0 && _foodInventoryStatusId == FoodInventoryStatus.RanOut)
                {
                    DomainEvents.Add(new FoodStockRechargedEvent(this));
                }

                _foodInventoryStatusId = value;
            }
        }
    }
}
