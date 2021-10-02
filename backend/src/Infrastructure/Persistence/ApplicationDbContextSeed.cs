using Domain.Entities;
using Domain.Enums;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Store.Domain.Entities;
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
                Email = "admin@localhost.com"
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
                    FoodInventoryStatus = FoodInventoryStatus.Available,
                });

                if (!context.TodoLists.Any())
                {
                    context.TodoLists.Add(new TodoList
                    {
                        Title = "Shopping",
                        Items =
                    {
                        new TodoItem { Title = "Apples", Done = true },
                        new TodoItem { Title = "Milk", Done = true },
                        new TodoItem { Title = "Bread", Done = true },
                        new TodoItem { Title = "Toilet paper" },
                        new TodoItem { Title = "Pasta" },
                        new TodoItem { Title = "Tissues" },
                        new TodoItem { Title = "Tuna" },
                        new TodoItem { Title = "Water" }
                    }
                    });

                    await context.SaveChangesAsync();
                }
            }
        }
    }
}