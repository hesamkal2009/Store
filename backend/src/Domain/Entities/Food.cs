using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public record Food
    {
        public int Id { get; set; }
        public int ProductCategoryId { get; set; }
        public FoodCategory foodCategory { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }

    }
}
