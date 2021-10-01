using Ardalis.SmartEnum;

namespace Domain.Enums
{
    //! Most Proper Implementation
    public sealed class FoodInventoryStatus : SmartEnum<FoodInventoryStatus>
    {
        private FoodInventoryStatus(string name, int value) : base(name, value)
        {
        }

        public static readonly FoodInventoryStatus Available = new FoodInventoryStatus(nameof(Available), 1);
        public static readonly FoodInventoryStatus RunningLow = new FoodInventoryStatus(nameof(RunningLow), 2);
        public static readonly FoodInventoryStatus RanOut = new FoodInventoryStatus(nameof(RanOut), 3);
    }
     
    //! Normal Enum
    //public enum FoodInventoryStatus
    //{
    //    Available,
    //    RunningLow,
    //    RanOut,
    //}

    //! Better Implementation
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
