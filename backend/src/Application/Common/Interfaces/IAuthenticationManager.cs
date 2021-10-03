namespace Application.Common.Interfaces
{
    public interface IAuthenticationManager
    {
        public byte[] GetSecretServiceApiKey();

        public string GenerateToken();
    }
}