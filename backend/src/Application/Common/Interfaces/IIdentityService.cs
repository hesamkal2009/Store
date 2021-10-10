using Application.Common.Models;
using Application.Common.Models.Identity;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Application.Common.Interfaces
{
    public interface IIdentityService
    {
        Task<(Result Result, string UserId)> AddClaimsToUser(UserDto userDto, List<Claim> claims);
        Task<(Result Result, string UserId)> AddClaimToUser(UserDto userDto, Claim claim);
        Task<(Result Result, string UserId)> AddToUserAccessFailedAsync(UserDto userDto);
        Task<(Result Result, string UserId)> AddUserPasswordAsync(UserDto userDto);
        Task<(Result Result, string UserId)> AddUserToRoleAsync(UserDto userDto, string role);
        Task<bool> AddUserToRolesAsync(UserDto userDto, string role);
        Task<(Result Result, string UserId)> AddUserToRolesAsync(UserDto userDto, List<string> role);
        Task<(Result Result, string UserId)> ChangeUserPasswordAsync(UserDto userDto, string oldPassoword, string newPassword);
        Task<(Result Result, string UserId)> ChangeUserPhoneNumberAsync(UserDto userDto, string oldPhoneNumber, string newPhoneNumber);
        Task<bool> CheckUserPasswordAsync(UserDto userDto, string givenPassword);
        Task<(Result Result, string UserId)> CreateUserAsync(UserDto userDto);
        Task<Result> DeleteUserAsync(string userId);
        Task<UserDto> FindUserByIdAsync(string userId);
        Task<string> FindUserIdAsync(string email, string password);
        Task<string> GenerateToken(string userId);
        Task<int> GetUserAccessFailedCountAsync(UserDto userDto);
        Task<UserDto> GetUserAsync(string userId);
        Task<IList<Claim>> GetUserClaimsAsync(UserDto userDto);
        Task<string> GetUserNameAsync(string userId);
        Task<IList<string>> GetUserRolesAsync(UserDto userDto);
        Task<IList<UserDto>> GetUsersForClaimAsync(Claim claim);
        Task<(Result Result, string UserId)> RemoveClaimFromUser(UserDto userDto, Claim claim);
        Task<(Result Result, string UserId)> RemoveClaimsFromUser(UserDto userDto, Claim oldClaim, Claim newClaim);
        Task<(Result Result, string UserId)> RemoveClaimsFromUser(UserDto userDto, List<Claim> claim);
        Task<(Result Result, string UserId)> RemoveUserFromRoleAsync(UserDto userDto, string role);
        Task<(Result Result, string UserId)> RemoveUserFromRolesAsync(UserDto userDto, List<string> role);
        Task<(Result Result, string UserId)> ResetUserAccessFailedCountAsync(UserDto userDto);
        Task<(Result Result, string UserId)> ResetUserPasswordAsync(UserDto userDto, string token, string newPassword);
        Task<(Result Result, string UserId)> SetUserTwoFactorLoginEnabledAsync(UserDto userDto, bool isEnable);
        Task<bool> UserHasPasswordAsync(UserDto userDto);
    }
}