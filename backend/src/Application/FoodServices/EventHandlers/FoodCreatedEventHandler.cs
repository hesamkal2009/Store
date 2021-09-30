using Application.Common.Models;
using Domain.Events.FoodEvents;
using MediatR;
using Microsoft.Extensions.Logging;
using System.Threading;
using System.Threading.Tasks;

namespace Application.FoodServices.EventHandlers
{
    public class FoodCreatedEventHandler : INotificationHandler<DomainEventNotification<FoodCreatedEvent>>
    {
        public FoodCreatedEventHandler(ILogger logger)
        {
            _logger = logger;
        }

        private readonly ILogger _logger;

        public Task Handle(DomainEventNotification<FoodCreatedEvent> notification, CancellationToken cancellationToken)
        {
            var domainEvent = notification.DomainEvent;

            _logger.LogInformation("Store Domain Event : {DomainEvent}", domainEvent.GetType().Name);

            return Task.CompletedTask;
        }
    }
}
