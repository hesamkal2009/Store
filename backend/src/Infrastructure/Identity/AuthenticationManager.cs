using Application.Common.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Infrastructure.Identity
{
    public class AuthenticationManager : IAuthenticationManager
    {
        public AuthenticationManager(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        private readonly IConfiguration _configuration;

        public byte[] GetSecretServiceApiKey()
        {
            string plainServiceApiKey = _configuration.GetValue<string>("ServiceApiKey");
            return Encoding.ASCII.GetBytes(plainServiceApiKey);
        }

        public string GenerateToken()
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var serviceApiKey = GetSecretServiceApiKey();
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