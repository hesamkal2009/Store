using Application.Common.Models.Identity;
using AutoMapper;

namespace Infrastructure.Identity.Mappings
{
    public class IdentityMapper : Profile
    {
        public IdentityMapper()
        {
            CreateMap<ApplicationUser, UserDto>()
                .ForMember(o => o.claims, options => options.Ignore())
                .ForMember(o => o.Roles, options => options.Ignore())
                .ForMember(o => o.Password, o => o.MapFrom(x => x.PasswordHash));

            CreateMap<ApplicationRole, RoleDto>();
        }
    }
}