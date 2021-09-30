using Application.Common.Interfaces;
using Application.Common.Models;
using Domain.Common;
using MediatR;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class DomainEventService : IDomainEventService
    {
        public DomainEventService(ILogger<DomainEventService> logger, IMediator mediator)
        {
            _logger = logger;
            _mediator = mediator;
        }

        private readonly IMediator _mediator;
        private readonly ILogger<DomainEventService> _logger;

        public async Task Publish(DomainEvent domainEvent)
        {
            _logger.LogInformation("Publishing domain event: Event - {event}", domainEvent.GetType().Name);
            await _mediator.Publish(GetNotificationCorrespondingToDomainEvent(domainEvent));
        }

        private object GetNotificationCorrespondingToDomainEvent(DomainEvent domainEvent)
        {
            return (INotification)Activator.CreateInstance(
                typeof(DomainEventNotification<>).MakeGenericType(domainEvent.GetType()), domainEvent);
        }
    }
}
