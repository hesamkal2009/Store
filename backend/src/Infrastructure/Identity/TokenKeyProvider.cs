using Application.Common.Interfaces;
using System;
using System.Text;

namespace Infrastructure.Identity
{
    public class TokenKeyProvider : ITokenKeyProvider
    {
        public byte[] GetJwtTokenKey()
        {
            string plainServiceApiKey = Environment.GetEnvironmentVariable("JWT_TOKEN_KEY");
            return Encoding.ASCII.GetBytes(plainServiceApiKey);
        }
    }
}