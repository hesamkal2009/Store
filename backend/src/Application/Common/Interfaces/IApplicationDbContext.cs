using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Common.Interfaces
{
    public interface IApplicationDbContext
    {
        DbSet<Food> Foods { get; set; }
        DbSet<FoodCategory> FoodCategories { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
