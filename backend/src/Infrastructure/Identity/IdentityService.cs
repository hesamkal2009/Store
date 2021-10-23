using Application.Common.Interfaces;
using Application.Common.Models;
using Application.Common.Models.Identity;
using Ardalis.GuardClauses;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Infrastructure.Identity
{
    public class IdentityService : IIdentityService
    {
        public IdentityService(UserManager<ApplicationUser> userManager, IMapper mapper, ITokenKeyProvider tokenKeyProvider)
        {
            _mapper = mapper;
            _userManager = userManager;
            _tokenKeyProvider = tokenKeyProvider;
        }

        private readonly IMapper _mapper;
        private readonly ITokenKeyProvider _tokenKeyProvider;
        private readonly UserManager<ApplicationUser> _userManager;

        public async Task<string> FindUserIdAsync(string email, string password)
        {
            ApplicationUser user = await _userManager.FindByEmailAsync(email);

            Guard.Against.Null(user, nameof(user), "User didn't found!");

            bool isPasswordCorrect = await _userManager.CheckPasswordAsync(user, password);

            if (!isPasswordCorrect)
            {
                return null;
            }

            return user.Id;
        }

        public async Task<UserDto> GetUserAsync(string userId)
        {
            ApplicationUser user = await _userManager.Users.FirstAsync(u => u.Id == userId);

            Guard.Against.Null(user, nameof(user), "User didn't found!");

            List<Claim> userClaims = (await _userManager.GetClaimsAsync(user)).ToList();
            List<string> userRoles = (await _userManager.GetRolesAsync(user)).ToList();

            var userDto = new UserDto();
            userDto.claims = userClaims;
            userDto.Roles = userRoles;
            _mapper.Map<UserDto>(user);

            return userDto;
        }

        public async Task<string> GetUserNameAsync(string userId)
        {
            var user = await _userManager.Users.FirstAsync(u => u.Id == userId);

            Guard.Against.Null(user, nameof(user), "User didn't found!");

            return user.UserName;
        }

        public async Task<(Result Result, string UserId)> CreateUserAsync(UserDto userDto)
        {
            ApplicationUser user = _mapper.Map<ApplicationUser>(userDto);

            IdentityResult result = await _userManager.CreateAsync(user, user.PasswordHash);

            return (result.ToApplicationResult(), user.Id);
        }

        public async Task<(Result Result, string UserId)> AddUserToRoleAsync(string userId, string role)
        {
            ApplicationUser user = await GetUserByIdAsync(userId);

            IdentityResult result = await _userManager.AddToRoleAsync(user, role);

            return (result.ToApplicationResult(), user.Id);
        }

        public async Task<(Result Result, string UserId)> AddUserToRolesAsync(string userId, List<string> role)
        {
            ApplicationUser user = await GetUserByIdAsync(userId);

            IdentityResult result = await _userManager.AddToRolesAsync(user, role);

            return (result.ToApplicationResult(), user.Id);
        }

        public async Task<bool> AddUserToRolesAsync(string userId, string role)
        {
            ApplicationUser user = await GetUserByIdAsync(userId);

            var result = await _userManager.IsInRoleAsync(user, role);

            return result;
        }

        public async Task<(Result Result, string UserId)> RemoveUserFromRoleAsync(string userId, string role)
        {
            ApplicationUser user = await GetUserByIdAsync(userId);

            IdentityResult result = await _userManager.RemoveFromRoleAsync(user, role);

            return (result.ToApplicationResult(), user.Id);
        }

        public async Task<(Result Result, string UserId)> RemoveUserFromRolesAsync(string userId, List<string> role)
        {
            ApplicationUser user = await GetUserByIdAsync(userId);

            IdentityResult result = await _userManager.RemoveFromRolesAsync(user, role);

            return (result.ToApplicationResult(), user.Id);
        }

        public async Task<IList<string>> GetUserRolesAsync(string userId)
        {
            ApplicationUser user = await GetUserByIdAsync(userId);

            var result = await _userManager.GetRolesAsync(user);

            return result;
        }

        public async Task<(Result Result, string UserId)> AddClaimToUser(string userId, Claim claim)
        {
            ApplicationUser user = await GetUserByIdAsync(userId);

            IdentityResult result = await _userManager.AddClaimAsync(user, claim);

            return (result.ToApplicationResult(), user.Id);
        }

        public async Task<(Result Result, string UserId)> AddClaimsToUser(string userId, List<Claim> claims)
        {
            ApplicationUser user = await GetUserByIdAsync(userId);

            IdentityResult result = await _userManager.AddClaimsAsync(user, claims);

            return (result.ToApplicationResult(), user.Id);
        }

        public async Task<IList<Claim>> GetUserClaimsAsync(string userId)
        {
            ApplicationUser user = await GetUserByIdAsync(userId);

            IList<Claim> result = await _userManager.GetClaimsAsync(user);

            return result;
        }

        public async Task<IList<UserDto>> GetUsersForClaimAsync(Claim claim)
        {
            IList<ApplicationUser> result = await _userManager.GetUsersForClaimAsync(claim);

            List<UserDto> users = new List<UserDto>();
            users.AddRange(result.Select(user => _mapper.Map<UserDto>(user)));

            return users;
        }

        public async Task<(Result Result, string UserId)> RemoveClaimFromUser(string userId, Claim claim)
        {
            ApplicationUser user = await GetUserByIdAsync(userId);

            IdentityResult result = await _userManager.RemoveClaimAsync(user, claim);

            return (result.ToApplicationResult(), user.Id);
        }

        public async Task<(Result Result, string UserId)> RemoveClaimsFromUser(string userId, List<Claim> claim)
        {
            ApplicationUser user = await GetUserByIdAsync(userId);

            IdentityResult result = await _userManager.RemoveClaimsAsync(user, claim);

            return (result.ToApplicationResult(), user.Id);
        }

        public async Task<(Result Result, string UserId)> RemoveClaimsFromUser(string userId, Claim oldClaim, Claim newClaim)
        {
            ApplicationUser user = await GetUserByIdAsync(userId);

            IdentityResult result = await _userManager.ReplaceClaimAsync(user, oldClaim, newClaim);

            return (result.ToApplicationResult(), user.Id);
        }

        public async Task<(Result Result, string UserId)> SetUserTwoFactorLoginEnabledAsync(string userId, bool isEnable)
        {
            ApplicationUser user = await GetUserByIdAsync(userId);

            IdentityResult result = await _userManager.SetTwoFactorEnabledAsync(user, isEnable);

            return (result.ToApplicationResult(), user.Id);
        }

        public async Task<(Result Result, string UserId)> AddToUserAccessFailedAsync(string userId)
        {
            ApplicationUser user = await GetUserByIdAsync(userId);

            IdentityResult result = await _userManager.AccessFailedAsync(user);

            return (result.ToApplicationResult(), user.Id);
        }

        public async Task<int> GetUserAccessFailedCountAsync(string userId)
        {
            ApplicationUser user = await GetUserByIdAsync(userId);

            int result = await _userManager.GetAccessFailedCountAsync(user);

            return result;
        }

        public async Task<(Result Result, string UserId)> ResetUserAccessFailedCountAsync(string userId)
        {
            ApplicationUser user = await GetUserByIdAsync(userId);

            IdentityResult result = await _userManager.ResetAccessFailedCountAsync(user);

            return (result.ToApplicationResult(), user.Id);
        }

        public async Task<(Result Result, string UserId)> AddUserPasswordAsync(string userId)
        {
            ApplicationUser user = await GetUserByIdAsync(userId);

            IdentityResult result = await _userManager.AddPasswordAsync(user, user.PasswordHash);

            return (result.ToApplicationResult(), user.Id);
        }

        public async Task<(Result Result, string UserId)> ChangeUserPasswordAsync(string userId, string oldPassoword, string newPassword)
        {
            ApplicationUser user = await GetUserByIdAsync(userId);

            IdentityResult result = await _userManager.ChangePasswordAsync(user, oldPassoword, newPassword);

            return (result.ToApplicationResult(), user.Id);
        }

        public async Task<(Result Result, string UserId)> ChangeUserPhoneNumberAsync(string userId, string oldPhoneNumber, string newPhoneNumber)
        {
            ApplicationUser user = await GetUserByIdAsync(userId);

            IdentityResult result = await _userManager.ChangePhoneNumberAsync(user, oldPhoneNumber, newPhoneNumber);

            return (result.ToApplicationResult(), user.Id);
        }

        public async Task<bool> CheckUserPasswordAsync(string userId, string givenPassword)
        {
            ApplicationUser user = await GetUserByIdAsync(userId);

            bool result = await _userManager.CheckPasswordAsync(user, givenPassword);

            return result;
        }

        public async Task<UserDto> FindUserByIdAsync(string userId)
        {
            ApplicationUser result = await _userManager.FindByIdAsync(userId);

            return _mapper.Map<UserDto>(result);
        }

        public async Task<bool> UserHasPasswordAsync(string userId)
        {
            ApplicationUser user = await GetUserByIdAsync(userId);

            bool result = await _userManager.HasPasswordAsync(user);

            return result;
        }

        public async Task<(Result Result, string UserId)> ResetUserPasswordAsync(string userId, string token, string newPassword)
        {
            ApplicationUser user = await GetUserByIdAsync(userId);

            IdentityResult result = await _userManager.ResetPasswordAsync(user, token, newPassword);

            return (result.ToApplicationResult(), user.Id);
        }

        public async Task<Result> DeleteUserAsync(string userId)
        {
            var user = _userManager.Users.SingleOrDefault(u => u.Id == userId);

            return await DeleteUserAsync(user);

            async Task<Result> DeleteUserAsync(ApplicationUser user)
            {
                var result = await _userManager.DeleteAsync(user);

                return result.ToApplicationResult();
            }
        }

        public async Task<string> GenerateToken(string userId, bool rememberMe)
        {
            ApplicationUser user = await _userManager.Users.FirstAsync(u => u.Id == userId);

            if (user == null)
            {
                return null;
            }

            List<Claim> claims = (await _userManager.GetClaimsAsync(user)).ToList();
            List<string> roles = (await _userManager.GetRolesAsync(user)).ToList();

            var tokenHandler = new JwtSecurityTokenHandler();
            var serviceApiKey = _tokenKeyProvider.GetJwtTokenKey();

            List<Claim> userClaimsList = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim("UserName", user.UserName),
                new Claim("PhoneNumberConfirmed", user.PhoneNumberConfirmed.ToString()),
                new Claim("EmailConfirmed", user.EmailConfirmed.ToString()),
            };

            userClaimsList.AddRange(claims.Select(claim => claim));
            userClaimsList.AddRange(roles.Select(role => new Claim(ClaimsIdentity.DefaultRoleClaimType, role)));

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(userClaimsList),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(serviceApiKey), SecurityAlgorithms.HmacSha256),
                IssuedAt = DateTime.UtcNow
            };

            if (!rememberMe)
            {
                tokenDescriptor.Expires = DateTime.UtcNow.AddDays(1);
            }
            else
            {
                tokenDescriptor.Expires = DateTime.UtcNow.AddDays(365);
            }

            var createdToken = tokenHandler.CreateToken(tokenDescriptor);
            var token = tokenHandler.WriteToken(createdToken);

            return token;
        }

        private async Task<ApplicationUser> GetUserByIdAsync(string userId)
        {
            ApplicationUser user = await _userManager.Users.FirstAsync(u => u.Id == userId);

            Guard.Against.Null(user, nameof(user), "User didn't found!");

            return user;
        }
    }
}