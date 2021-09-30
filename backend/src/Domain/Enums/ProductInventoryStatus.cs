namespace Domain.Enums
{
    public enum FoodInventoryStatus
    {
        Available,
        RunningLow,
        RanOut,
    }

    // Alternative Implementation
    //public class FoodInventoryStatus
    //{
    //    private FoodInventoryStatus(int value) { Value = value; }

    //    public int Value { get; private set; }

    //    public static FoodInventoryStatus Available { get { return new FoodInventoryStatus(0); } }
    //    public static FoodInventoryStatus RunningLow { get { return new FoodInventoryStatus(1); } }
    //    public static FoodInventoryStatus RanOut { get { return new FoodInventoryStatus(2); } }
    //}
}
