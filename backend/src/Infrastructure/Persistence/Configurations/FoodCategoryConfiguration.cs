using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
    public class FoodCategoryConfiguration : IEntityTypeConfiguration<FoodCategory>
    {
        public void Configure(EntityTypeBuilder<FoodCategory> builder)
        {
            builder.Ignore(o => o.DomainEvents);

            builder.Property(o => o.Name)
                .HasMaxLength(200)
                .IsRequired();

            builder.Property(o => o.IsActive)
                .HasColumnType(_ColumnTypes.BitType.Value)
                .IsRequired();
        }
    }
}
