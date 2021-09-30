using Domain.Common;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Events.FoodCategoryEvents
{
    public class FoodCategoryCreatedEvent : DomainEvent
    {
        public FoodCategoryCreatedEvent(FoodCategory foodCategory)
        {
            FoodCategory = foodCategory;
        }

        public FoodCategory FoodCategory { get; }
    }
}
