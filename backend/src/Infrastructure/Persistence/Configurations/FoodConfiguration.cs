using Domain.Entities;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
    public class FoodConfiguration : IEntityTypeConfiguration<Food>
    {
        public void Configure(EntityTypeBuilder<Food> builder)
        {
            builder.Ignore(o => o.DomainEvents);

            builder.Property(o => o.Name)
                .HasMaxLength(200)
                .IsRequired();

            builder.Property(o => o.Price)
                .HasColumnType(_ColumnTypes.decimalType.Value)
                .IsRequired();

            builder.Property(o => o.FoodInventoryStatus)
               .HasConversion(
                   p => p.Value,
                   p => FoodInventoryStatus.FromValue(p));

        }
    }
}
