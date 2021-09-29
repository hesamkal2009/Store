using System;
using System.Collections.Generic;

namespace Domain.Common
{
    public interface IHasDomainEvent
    {
        public List<DomainEvent> DomainEvents { get; set; }
    }

    public class DomainEvent
    {
        protected DomainEvent()
        {
            DateOccured = DateTimeOffset.UtcNow; 
        }

        public DateTimeOffset DateOccured { get; protected set; } = DateTime.UtcNow;
    }
}
