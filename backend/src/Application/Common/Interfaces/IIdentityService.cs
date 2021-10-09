using Application.Common.Models;
using Application.Common.Models.Identity;
using System.Threading.Tasks;

namespace Application.Common.Interfaces
{
    public interface IIdentityService
    {
        Task<string> FindUserIdAsync(string email, string password);

        Task<UserDto> GetUserAsync(string userId);

        Task<string> GetUserNameAsync(string userId);

        Task<(Result Result, string UserId)> CreateUserAsync(string userName, string password);

        Task<Result> DeleteUserAsync(string userId);

        Task<string> GenerateToken(string userId);
    }
}