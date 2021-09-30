using Application.Common.Models;
using Domain.Events.FoodCategoryEvents;
using MediatR;
using Microsoft.Extensions.Logging;
using System.Threading;
using System.Threading.Tasks;

namespace Application.FoodCategoryServices.EventHandlers
{
    public class FoodCategoryCreatedEventHandler : INotificationHandler<DomainEventNotification<FoodCategoryCreatedEvent>>
    {
        public FoodCategoryCreatedEventHandler(ILogger logger)
        {
            _logger = logger;
        }

        private readonly ILogger _logger;

        public Task Handle(DomainEventNotification<FoodCategoryCreatedEvent> notification, CancellationToken cancellationToken)
        {
            var domainEvent = notification.DomainEvent;

            _logger.LogInformation("Store Domain Event : {DomainEvent}", domainEvent.GetType().Name);

            return Task.CompletedTask;
        }
    }
}
