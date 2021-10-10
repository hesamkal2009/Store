using Application.Common.Models;
using Application.Common.Models.Identity;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Application.Common.Interfaces
{
    public interface IRoleService
    {
        Task<(Result Result, string RoleId)> AddClaimToRoleAsync(RoleDto roleDto, Claim claim);

        Task<Result> CreateRoleAsync(RoleDto roleDto);

        Task<(Result Result, string RoleId)> DeleteClaimFromRoleAsync(RoleDto roleDto, Claim claim);

        Task<(Result Result, string RoleId)> DeleteRoleAsync(RoleDto roleDto);

        Task<RoleDto> FindRoleByIdAsync(string roleId);

        Task<RoleDto> FindRoleByNameAsync(string roleName);

        Task<IList<Claim>> GetRoleClaimsAsync(RoleDto roleDto);

        Task<(Result Result, string RoleId)> UpdateRoleAsync(RoleDto roleDto);
    }
}