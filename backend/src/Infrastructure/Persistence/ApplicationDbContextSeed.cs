using Domain.Entities;
using Domain.Enums;
using HK.Toolkit.Core;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Persistence
{
    public static class ApplicationDbContextSeed
    {
        public static async Task SeedDefaultUserAsync(UserManager<ApplicationUser> userManager)
        {
            var defaultUser = new ApplicationUser
            {
                UserName = "admin@localhost",
                Email = "admin@localhost"
            };

            if (userManager.Users.All(u => u.UserName != defaultUser.UserName))
            {
                await userManager.CreateAsync(defaultUser, "Admin1!");
            }
        }

        public static async Task SeedSampleDataAsync(ApplicationDbContext context)
        {
            if (!context.Foods.Any())
            {
                var foodCategory = context.FoodCategories.Add(new FoodCategory
                {
                    Name = "Irani",
                    Description = "Persian Dishes",
                    IsActive = true

                });

                context.Foods.Add(new Food
                {
                    Name = "Koobideh",
                    Price = 100000,
                    FoodCategoryId = foodCategory.Entity.Id,
                    FoodInventoryStatusId = FoodInventoryStatus.Available,
                });

                await context.SaveChangesAsync();
            }
        }
    }
}