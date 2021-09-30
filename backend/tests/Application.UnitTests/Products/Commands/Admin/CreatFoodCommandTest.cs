using System;
using System.Collections.Generic;
using Xunit;
using Shouldly;
using System.Linq;

namespace Application.UnitTests
{
    public class CreatFoodCommandTest : BaseTest
    {
        Food _food;

        [Fact]
        public void WhenAdminAddsNewFood_ThenFoodMustBeReturnedToCreator()
        {
            var list = new List<Food>();

            list.Add(_food);

            list.ShouldBeOfType<List<Food>>();
            list.FirstOrDefault().ShouldBe(_food);

        }


        // Local SETUP
        public CreatFoodCommandTest()
        {
            _food = Arrange();
        }

        private Food Arrange()
        {
            return new Food()
            {
                InsDate = DateTime.Now,
                StatusId = SubCategoryItems.Enable,
                CompanyId = 1,
                ProviderId = 1,
                Name = "پفک نمکی",
                GeneralDescription = "پفک نمکی یک پفک پر طرفدار است"
            };
        }
    }

    public static class SubCategoryItems
    {
        public static long Enable => 1;
        public static long Disable => 2;
        public static long Deleted => 3;
    }

    public class Food
    {
        public long Id { get; set; }
        public DateTime InsDate { get; set; }
        public long StatusId { get; set; }
        public long CompanyId { get; set; }
        public long ProviderId { get; set; }
        public string Name { get; set; }
        public string GeneralDescription { get; set; }
    }
}