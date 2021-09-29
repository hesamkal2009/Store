namespace Domain.Entities
{
    public record FoodCategory
    {
        public int Id { get; set; }
        public bool IsActive { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

    }
}
