using Application.Common.Interfaces;
using Application.Common.Models;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.ContactMeService.Commands.CreateContactMe
{
    public class ContactMeCommand : IRequest<Result>
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
    }

    public class ContactMeCommandHandler : IRequestHandler<ContactMeCommand, Result>
    {
        public ContactMeCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        private readonly IApplicationDbContext _context;

        public async Task<Result> Handle(ContactMeCommand request, CancellationToken cancellationToken)
        {
            var entity = new ContactMe()
            {
                FullName = request.FullName,
                Email = request.Email,
                PhoneNumber = request.PhoneNumber,
                Subject = request.Subject,
                Message = request.Message,
            };

            _context.ContactMes.Add(entity);

            try
            {
                await _context.SaveChangesAsync(cancellationToken);

                return Result.Success();
            }
            catch (Exception ex)
            {

                return Result.Failure(new List<string> { ex.Message });
            }
        }
    }
}
