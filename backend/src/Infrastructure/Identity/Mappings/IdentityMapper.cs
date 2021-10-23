using Application.Common.Models.Identity;
using AutoMapper;

namespace Infrastructure.Identity.Mappings
{
    public class IdentityMapper : Profile
    {
        public IdentityMapper()
        {
            CreateMap<ApplicationUser, UserDto>()
                .ForMember(o => o.Password, o => o.Ignore());

            CreateMap<UserDto, ApplicationUser>()
               .ForMember(o => o.Id, o => o.Ignore())
               .ForMember(o => o.SecurityStamp, o => o.Ignore())
               .ForMember(o => o.ConcurrencyStamp, o => o.Ignore())
               .ForMember(o => o.LockoutEnabled, o => o.Ignore())
               .ForMember(o => o.PhoneNumberConfirmed, o => o.Ignore())
               .ForMember(o => o.EmailConfirmed, o => o.Ignore())
               .ForMember(o => o.PasswordHash, o => o.MapFrom(x => x.Password));


            CreateMap<RoleDto, ApplicationRole>()
                .ForMember(o => o.ConcurrencyStamp, o => o.Ignore());
        }
    }
}