using Domain.Entities;
using Domain.Enums;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Store.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Persistence
{
    public static class ApplicationDbContextSeed
    {
        public static async Task SeedDefaultUserAsync(
            UserManager<ApplicationUser> userManager,
            RoleManager<ApplicationRole> roleManager
            )
        {
            var defaultRole = new ApplicationRole
            {
                Id = Guid.NewGuid().ToString(),
                Name = "Administrator",
                NormalizedName = "ADMINISTRATOR",
                ConcurrencyStamp = Guid.NewGuid().ToString()
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

                IEnumerable<FoodCategory> foodCategories = new List<FoodCategory>()
                {
                    new FoodCategory
                    {
                        Name = "Kebabs & Main Courses",
                        Description = "Persian kebabs could be served with and without Iranian cooked rice.",
                        IsActive = true
                    },
                    new FoodCategory
                    {
                        Name = "Salads & Appetizers",
                        Description = "Salads and Appetizer could be served before and with Mian Course.",
                        IsActive = true
                    },
                    new FoodCategory
                    {
                        Name = "Deserts & Sweets",
                        Description = "Persian Deserts and Sweets could ONLY be served after Main Course.",
                        IsActive = true
                    }
                };

                IEnumerable<Food> foods = new List<Food>()
                {
                    new Food
                    {
                        Name = "Koobideh",
                        Price = 1000000,
                        FoodCategoryId = 1,
                        FoodInventoryStatus = FoodInventoryStatus.Available,
                    },
                    new Food
                    {
                        Name = "Soltani",
                        Price = 1200000,
                        FoodCategoryId = 1,
                        FoodInventoryStatus = FoodInventoryStatus.Available,
                    },
                    new Food
                    {
                        Name = "Shandiz",
                        Price = 1800000,
                        FoodCategoryId = 1,
                        FoodInventoryStatus = FoodInventoryStatus.RunningLow,
                    },
                    new Food
                    {
                        Name = "Salad",
                        Price = 800000,
                        FoodCategoryId = 2,
                        FoodInventoryStatus = FoodInventoryStatus.Available,
                    },
                    new Food
                    {
                        Name = "French Fries",
                        Price = 500000,
                        FoodCategoryId = 2,
                        FoodInventoryStatus = FoodInventoryStatus.RunningLow,
                    },
                    new Food
                    {
                        Name = "Sohan",
                        Price = 700000,
                        FoodCategoryId = 3,
                        FoodInventoryStatus = FoodInventoryStatus.RanOut,
                    },
                    new Food
                    {
                        Name = "Chocolate",
                        Price = 400000,
                        FoodCategoryId = 3,
                        FoodInventoryStatus = FoodInventoryStatus.Available,
                    }
                };

                context.FoodCategories.AddRange(foodCategories);
                context.Foods.AddRange(foods);


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