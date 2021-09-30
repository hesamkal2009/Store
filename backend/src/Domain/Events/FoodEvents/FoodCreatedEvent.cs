using Domain.Common;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Events.FoodEvents
{
    public class FoodCreatedEvent : DomainEvent
    {
        public FoodCreatedEvent(Food food)
        {
            Food = food;
        }

        public Food Food { get; }
    }
}
