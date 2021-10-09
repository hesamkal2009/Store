using Domain.Entities;
using Domain.Enums;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Store.Domain.Entities;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Persistence
{
    public static class ApplicationDbContextSeed
    {
        public static async Task SeedDefaultUserAsync(
            UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager
            )
        {
            var defaultRole = new ApplicationRole
            {
                Id = Guid.NewGuid().ToString(),
                Name = "Administrator",
                NormalizedName = "ADMINISTRATOR",
                ConcurrencyStamp = ""
            };

            var defaultUser = new ApplicationUser
            {
                Id = Guid.NewGuid().ToString(),
                UserName = "admin",
                NormalizedUserName = "ADMIN",
                PhoneNumber = "091212345678",
                PhoneNumberConfirmed = true,
                Email = "hesamkal2009@gmail.com",
                NormalizedEmail = "HESAMKAL2009@GMAIL.COM",
                EmailConfirmed = true,
                SecurityStamp = string.Empty,
                LockoutEnabled = false,
                AccessFailedCount = 0,
                ConcurrencyStamp = null,
                LockoutEnd = null
            };

            if (roleManager.Roles.All(u => u.Name != defaultRole.Name))
            {
                await roleManager.CreateAsync(defaultRole);
            }

            if (userManager.Users.All(u => u.UserName != defaultUser.UserName))
            {
                await userManager.CreateAsync(defaultUser, "!Admin1!");
            }

            if (!await userManager.IsInRoleAsync(defaultUser, "Administrator"))
            {
                await userManager.AddToRoleAsync(defaultUser, "Administrator");
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