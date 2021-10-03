using Microsoft.Extensions.Configuration;
using System.Text;

namespace Infrastructure.Identity
{
    public class AuthenticationManager
    {
        public AuthenticationManager(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        private readonly IConfiguration _configuration;

        public byte[] jwtKey()
        {
            string plainServiceApiKey = _configuration.GetValue<string>("ServiceApiKey");
            return Encoding.ASCII.GetBytes(plainServiceApiKey);
        }
    }
}