using Application.Common.Models;
using Application.Common.Models.Identity;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Application.Common.Interfaces
{
    public interface IIdentityService
    {
        Task<(Result Result, string UserId)> AddClaimsToUser(string userId, List<Claim> claims);
        Task<(Result Result, string UserId)> AddClaimToUser(string userId, Claim claim);
        Task<(Result Result, string UserId)> AddToUserAccessFailedAsync(string userId);
        Task<(Result Result, string UserId)> AddUserPasswordAsync(string userId);
        Task<(Result Result, string UserId)> AddUserToRoleAsync(string userId, string role);
        Task<bool> AddUserToRolesAsync(string userId, string role);
        Task<(Result Result, string UserId)> AddUserToRolesAsync(string userId, List<string> role);
        Task<(Result Result, string UserId)> ChangeUserPasswordAsync(string userId, string oldPassoword, string newPassword);
        Task<(Result Result, string UserId)> ChangeUserPhoneNumberAsync(string userId, string oldPhoneNumber, string newPhoneNumber);
        Task<bool> CheckUserPasswordAsync(string userId, string givenPassword);
        Task<(Result Result, string UserId)> CreateUserAsync(UserDto userDto);
        Task<Result> DeleteUserAsync(string userId);
        Task<UserDto> FindUserByIdAsync(string userId);
        Task<string> FindUserIdAsync(string email, string password);
        Task<string> GenerateToken(string userId, bool rememberMe);
        Task<int> GetUserAccessFailedCountAsync(string userId);
        Task<UserDto> GetUserAsync(string userId);
        Task<IList<Claim>> GetUserClaimsAsync(string userId);
        Task<string> GetUserNameAsync(string userId);
        Task<IList<string>> GetUserRolesAsync(string userId);
        Task<IList<UserDto>> GetUsersForClaimAsync(Claim claim);
        Task<(Result Result, string UserId)> RemoveClaimFromUser(string userId, Claim claim);
        Task<(Result Result, string UserId)> RemoveClaimsFromUser(string userId, Claim oldClaim, Claim newClaim);
        Task<(Result Result, string UserId)> RemoveClaimsFromUser(string userId, List<Claim> claim);
        Task<(Result Result, string UserId)> RemoveUserFromRoleAsync(string userId, string role);
        Task<(Result Result, string UserId)> RemoveUserFromRolesAsync(string userId, List<string> role);
        Task<(Result Result, string UserId)> ResetUserAccessFailedCountAsync(string userId);
        Task<(Result Result, string UserId)> ResetUserPasswordAsync(string userId, string token, string newPassword);
        Task<(Result Result, string UserId)> SetUserTwoFactorLoginEnabledAsync(string userId, bool isEnable);
        Task<bool> UserHasPasswordAsync(string userId);
    }
}