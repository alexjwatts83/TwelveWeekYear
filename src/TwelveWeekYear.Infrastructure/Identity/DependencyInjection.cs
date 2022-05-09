using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TwelveWeekYear.Application.Interfaces;
using TwelveWeekYear.Infrastructure.Persistence;

namespace TwelveWeekYear.Infrastructure.Identity
{
	public static class DependencyInjection
	{
		public static IServiceCollection AddInfrastructure(
			this IServiceCollection services,
			IConfiguration configuration)
		{
			//services.AddScoped<IAppDbContext>(provider =>
			//	provider.GetService<AppDbContext>());

			////services.AddDefaultIdentity<ApplicationUser>()
			////	.AddEntityFrameworkStores<AppDbContext>();

			////services.AddIdentityServer()
			////	.AddApiAuthorization<ApplicationUser, AppDbContext>();

			////services.AddAuthentication()
			////	.AddIdentityServerJwt();

			services.AddScoped<IIdentityService, IdentityService>();

			return services;
		}
	}
}
