using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class ApplicationUser : IdentityUser
    {
    }

    public class ApplicationRole : IdentityRole
    {
    }

    public class ApplicationUserRole : IdentityUserRole<string>
    {
    }

    public class ApplicationUserClaim : IdentityUserClaim<string>
    {
    }

    public class ApplicationRoleClaim : IdentityRoleClaim<string>
    {
    }

    public class ApplicationUserLogin : IdentityUserLogin<string>
    {
    }

    public class ApplicationUserToken : IdentityUserToken<string>
    {
    }
}