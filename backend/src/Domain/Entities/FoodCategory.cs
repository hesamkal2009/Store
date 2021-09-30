using Domain.Common;
using System.Collections.Generic;

namespace Domain.Entities
{
    public class FoodCategory : AuditableEntity, IHasDomainEvent
    {
        public int Id { get; set; }
        public bool IsActive { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public List<DomainEvent> DomainEvents { get; set; } = new List<DomainEvent>();
    }
}
