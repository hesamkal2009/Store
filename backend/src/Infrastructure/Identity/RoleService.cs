using Application.Common.Interfaces;
using Application.Common.Models;
using Application.Common.Models.Identity;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Infrastructure.Identity
{
    public class RoleService : IRoleService
    {
        public RoleService(RoleManager<ApplicationRole> roleManager, IMapper mapper)
        {
            _mapper = mapper;
            _roleManager = roleManager;
        }

        private readonly IMapper _mapper;
        private readonly RoleManager<ApplicationRole> _roleManager;

        private ApplicationRole RoleMapper(RoleDto roleDto) => _mapper.Map<ApplicationRole>(roleDto);

        public async Task<Result> CreateRoleAsync()
        {
            var result = await _roleManager.CreateAsync(new ApplicationRole() { Name = "New Role", NormalizedName = "New Role".ToUpper() });

            return result.ToApplicationResult();
        }

        public async Task<(Result Result, string RoleId)> DeleteRoleAsync(RoleDto roleDto)
        {
            var result = await _roleManager.DeleteAsync(RoleMapper(roleDto));

            return (result.ToApplicationResult(), roleDto.Id);
        }

        public async Task<(Result Result, string RoleId)> AddClaimToRoleAsync(RoleDto roleDto, Claim claim)
        {
            var result = await _roleManager.AddClaimAsync(RoleMapper(roleDto), claim);

            return (result.ToApplicationResult(), roleDto.Id);
        }

        public async Task<(Result Result, string RoleId)> DeleteClaimFromRoleAsync(RoleDto roleDto, Claim claim)
        {
            var result = await _roleManager.RemoveClaimAsync(RoleMapper(roleDto), claim);

            return (result.ToApplicationResult(), roleDto.Id);
        }

        public async Task<RoleDto> FindRoleByIdAsync(string roleId)
        {
            var role = await _roleManager.FindByIdAsync(roleId);

            return _mapper.Map<RoleDto>(role);
        }

        public async Task<RoleDto> FindRoleByNameAsync(string roleName)
        {
            var role = await _roleManager.FindByNameAsync(roleName);

            return _mapper.Map<RoleDto>(role);
        }

        public async Task<IList<Claim>> GetRoleClaimsAsync(RoleDto roleDto)
        {
            var result = await _roleManager.GetClaimsAsync(RoleMapper(roleDto));

            return result;
        }

        public async Task<(Result Result, string RoleId)> UpdateRoleAsync(RoleDto roleDto)
        {
            var result = await _roleManager.UpdateAsync(RoleMapper(roleDto));

            return (result.ToApplicationResult(), roleDto.Id);
        }
    }
}