namespace Application.Common.Interfaces
{
    public interface ITokenKeyProvider
    {
        public byte[] GetJwtTokenKey();
    }
}