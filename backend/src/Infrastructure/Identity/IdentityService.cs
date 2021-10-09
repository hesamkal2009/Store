using Application.Common.Interfaces;
using Application.Common.Models;
using Application.Common.Models.Identity;
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

        private ApplicationUser UserMapper(UserDto userDto) => _mapper.Map<ApplicationUser>(userDto);

        public async Task<string> FindUserIdAsync(string email, string password)
        {
            ApplicationUser user = await _userManager.FindByEmailAsync(email);

            if (user == null)
            {
                return null;
            }

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

            if (user == null)
            {
                return null;
            }

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

            return user.UserName;
        }

        public async Task<(Result Result, string UserId)> CreateUserAsync(string userName, string password)
        {
            var user = new ApplicationUser
            {
                UserName = userName,
                Email = userName
            };

            IdentityResult result = await _userManager.CreateAsync(user, password);

            return (result.ToApplicationResult(), user.Id);
        }

        public async Task<Result> DeleteUserAsync(string userId)
        {
            var user = _userManager.Users.SingleOrDefault(u => u.Id == userId);

            if (user != null)
            {
                return await DeleteUserAsync(user);
            }

            return Result.Success();

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
    }
}