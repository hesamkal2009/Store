using HKxUtilities.Type;
using Shouldly;
using Xunit;

namespace HKxUtilities.UnitTests
{
    public class TypeUtils
    {
        [Fact]
        public void WhenNumberIsGiven_ReturnsNumberWithIntType()
        {
            // Arrange 
            int expected = 10;
            string input = "10";

            // Act
            var result = input.To<int>();

            //Assert
            result.ShouldBe(expected);
        }
    }
}
