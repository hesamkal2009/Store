namespace Application.Common.Interfaces
{
    public interface IAuthenticationManager
    {
        public byte[] GetJwtTokenKey();

        public string GenerateToken();
    }
}