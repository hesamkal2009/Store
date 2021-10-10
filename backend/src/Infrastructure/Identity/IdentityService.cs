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
            ApplicationUser user = MapUserDtoToApplicationUser(userDto);

            IdentityResult result = await _userManager.CreateAsync(user, user.PasswordHash);

            return (result.ToApplicationResult(), user.Id);
        }

        public async Task<(Result Result, string UserId)> AddUserToRoleAsync(UserDto userDto, string role)
        {
            ApplicationUser user = MapUserDtoToApplicationUser(userDto);

            IdentityResult result = await _userManager.AddToRoleAsync(user, role);

            return (result.ToApplicationResult(), user.Id);
        }

        public async Task<(Result Result, string UserId)> AddUserToRolesAsync(UserDto userDto, List<string> role)
        {
            ApplicationUser user = MapUserDtoToApplicationUser(userDto);

            IdentityResult result = await _userManager.AddToRolesAsync(user, role);

            return (result.ToApplicationResult(), user.Id);
        }

        public async Task<bool> AddUserToRolesAsync(UserDto userDto, string role)
        {
            ApplicationUser user = MapUserDtoToApplicationUser(userDto);

            var result = await _userManager.IsInRoleAsync(user, role);

            return result;
        }

        public async Task<(Result Result, string UserId)> RemoveUserFromRoleAsync(UserDto userDto, string role)
        {
            ApplicationUser user = MapUserDtoToApplicationUser(userDto);

            IdentityResult result = await _userManager.RemoveFromRoleAsync(user, role);

            return (result.ToApplicationResult(), user.Id);
        }

        public async Task<(Result Result, string UserId)> RemoveUserFromRolesAsync(UserDto userDto, List<string> role)
        {
            ApplicationUser user = MapUserDtoToApplicationUser(userDto);

            IdentityResult result = await _userManager.RemoveFromRolesAsync(user, role);

            return (result.ToApplicationResult(), user.Id);
        }

        public async Task<IList<string>> GetUserRolesAsync(UserDto userDto)
        {
            ApplicationUser user = MapUserDtoToApplicationUser(userDto);

            var result = await _userManager.GetRolesAsync(user);

            return result;
        }

        public async Task<(Result Result, string UserId)> AddClaimToUser(UserDto userDto, Claim claim)
        {
            ApplicationUser user = MapUserDtoToApplicationUser(userDto);

            IdentityResult result = await _userManager.AddClaimAsync(user, claim);

            return (result.ToApplicationResult(), user.Id);
        }

        public async Task<(Result Result, string UserId)> AddClaimsToUser(UserDto userDto, List<Claim> claims)
        {
            ApplicationUser user = MapUserDtoToApplicationUser(userDto);

            IdentityResult result = await _userManager.AddClaimsAsync(user, claims);

            return (result.ToApplicationResult(), user.Id);
        }

        public async Task<IList<Claim>> GetUserClaimsAsync(UserDto userDto)
        {
            ApplicationUser user = MapUserDtoToApplicationUser(userDto);

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

        public async Task<(Result Result, string UserId)> RemoveClaimFromUser(UserDto userDto, Claim claim)
        {
            ApplicationUser user = MapUserDtoToApplicationUser(userDto);

            IdentityResult result = await _userManager.RemoveClaimAsync(user, claim);

            return (result.ToApplicationResult(), user.Id);
        }

        public async Task<(Result Result, string UserId)> RemoveClaimsFromUser(UserDto userDto, List<Claim> claim)
        {
            ApplicationUser user = MapUserDtoToApplicationUser(userDto);

            IdentityResult result = await _userManager.RemoveClaimsAsync(user, claim);

            return (result.ToApplicationResult(), user.Id);
        }

        public async Task<(Result Result, string UserId)> RemoveClaimsFromUser(UserDto userDto, Claim oldClaim, Claim newClaim)
        {
            ApplicationUser user = MapUserDtoToApplicationUser(userDto);

            IdentityResult result = await _userManager.ReplaceClaimAsync(user, oldClaim, newClaim);

            return (result.ToApplicationResult(), user.Id);
        }

        public async Task<(Result Result, string UserId)> SetUserTwoFactorLoginEnabledAsync(UserDto userDto, bool isEnable)
        {
            ApplicationUser user = MapUserDtoToApplicationUser(userDto);

            IdentityResult result = await _userManager.SetTwoFactorEnabledAsync(user, isEnable);

            return (result.ToApplicationResult(), user.Id);
        }

        public async Task<(Result Result, string UserId)> AddToUserAccessFailedAsync(UserDto userDto)
        {
            ApplicationUser user = MapUserDtoToApplicationUser(userDto);

            IdentityResult result = await _userManager.AccessFailedAsync(user);

            return (result.ToApplicationResult(), user.Id);
        }

        public async Task<int> GetUserAccessFailedCountAsync(UserDto userDto)
        {
            ApplicationUser user = MapUserDtoToApplicationUser(userDto);

            int result = await _userManager.GetAccessFailedCountAsync(user);

            return result;
        }

        public async Task<(Result Result, string UserId)> ResetUserAccessFailedCountAsync(UserDto userDto)
        {
            ApplicationUser user = MapUserDtoToApplicationUser(userDto);

            IdentityResult result = await _userManager.ResetAccessFailedCountAsync(user);

            return (result.ToApplicationResult(), user.Id);
        }

        public async Task<(Result Result, string UserId)> AddUserPasswordAsync(UserDto userDto)
        {
            ApplicationUser user = MapUserDtoToApplicationUser(userDto);

            IdentityResult result = await _userManager.AddPasswordAsync(user, user.PasswordHash);

            return (result.ToApplicationResult(), user.Id);
        }

        public async Task<(Result Result, string UserId)> ChangeUserPasswordAsync(UserDto userDto, string oldPassoword, string newPassword)
        {
            ApplicationUser user = MapUserDtoToApplicationUser(userDto);

            IdentityResult result = await _userManager.ChangePasswordAsync(user, oldPassoword, newPassword);

            return (result.ToApplicationResult(), user.Id);
        }

        public async Task<(Result Result, string UserId)> ChangeUserPhoneNumberAsync(UserDto userDto, string oldPhoneNumber, string newPhoneNumber)
        {
            ApplicationUser user = MapUserDtoToApplicationUser(userDto);

            IdentityResult result = await _userManager.ChangePhoneNumberAsync(user, oldPhoneNumber, newPhoneNumber);

            return (result.ToApplicationResult(), user.Id);
        }

        public async Task<bool> CheckUserPasswordAsync(UserDto userDto, string givenPassword)
        {
            ApplicationUser user = MapUserDtoToApplicationUser(userDto);

            bool result = await _userManager.CheckPasswordAsync(user, givenPassword);

            return result;
        }

        public async Task<UserDto> FindUserByIdAsync(string userId)
        {
            ApplicationUser result = await _userManager.FindByIdAsync(userId);

            return _mapper.Map<UserDto>(result);
        }

        public async Task<bool> UserHasPasswordAsync(UserDto userDto)
        {
            ApplicationUser user = MapUserDtoToApplicationUser(userDto);

            bool result = await _userManager.HasPasswordAsync(user);

            return result;
        }

        public async Task<(Result Result, string UserId)> ResetUserPasswordAsync(UserDto userDto, string token, string newPassword)
        {
            ApplicationUser user = MapUserDtoToApplicationUser(userDto);

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

        public async Task<string> GenerateToken(string userId)
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
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(serviceApiKey), SecurityAlgorithms.HmacSha256),
                IssuedAt = DateTime.UtcNow
            };

            var createdToken = tokenHandler.CreateToken(tokenDescriptor);
            var token = tokenHandler.WriteToken(createdToken);

            return token;
        }

        private ApplicationUser MapUserDtoToApplicationUser(UserDto userDto)
        {
            var user = UserMapper(userDto);

            Guard.Against.Null(user, nameof(user), "User didn't found!");

            return user;
        }

        private ApplicationUser UserMapper(UserDto userDto) => _mapper.Map<ApplicationUser>(userDto);
    }
}