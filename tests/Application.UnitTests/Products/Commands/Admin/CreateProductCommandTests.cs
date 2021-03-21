using System;
using System.Collections.Generic;
using Xunit;
using Shouldly;
using System.Linq;

namespace Application.UnitTests
{
    public class CreateProductCommandTests : BaseTest
    {
        Product _product;

        [Fact]
        public void WhenAdminAddsProudct_ThenProductMustBeReturnedToCreator()
        {
            var list = new List<Product>();

            list.Add(_product);

            list.ShouldBeOfType<List<Product>>();
            list.FirstOrDefault().ShouldBe(_product);

        }


        // Local SETUP
        public CreateProductCommandTests()
        {
            _product = Arrange();
        }

        private Product Arrange()
        {
            return new Product()
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

    public class Product
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