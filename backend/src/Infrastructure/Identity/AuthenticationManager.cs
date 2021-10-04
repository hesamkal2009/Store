using Application.Common.Interfaces;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Infrastructure.Identity
{
    public class AuthenticationManager : IAuthenticationManager
    {
        public byte[] GetJwtTokenKey()
        {
            string plainServiceApiKey = Environment.GetEnvironmentVariable("JWT_TOKEN_KEY");
            return Encoding.ASCII.GetBytes(plainServiceApiKey);
        }

        public string GenerateToken()
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var serviceApiKey = GetJwtTokenKey();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, "ClaimTypes.Name")
                }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(serviceApiKey), SecurityAlgorithms.HmacSha256)
            };

            var createdToken = tokenHandler.CreateToken(tokenDescriptor);
            var token = tokenHandler.WriteToken(createdToken);

            return token;
        }
    }
}