using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TwelveWeekYear.Application.Interfaces;
using TwelveWeekYear.Infrastructure.Identity;
using TwelveWeekYear.Infrastructure.Persistence;
using TwelveWeekYear.Infrastructure.Persistence.Configuration;

namespace TwelveWeekYear.Infrastructure
{
	public static class DependencyInjection
	{
		public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration config)
		{
			services.Configure<ConnectionStringSettings>(config.GetSection(ConnectionStringSettings.Section));

			//services.AddDbContext<AppDbContext>(options =>
			//	options.UseSqlServer(
			//		config.GetConnectionString("DbConStr")));

			services.AddPooledDbContextFactory<AppDbContext>(
				opt => opt.UseSqlServer(config.GetConnectionString("DbConStr")));

			services.AddScoped<IAppDbContext>(provider =>
				provider.GetService<AppDbContext>());

			services.AddTransient<AppDbContextInitialiser>();

			services.AddDefaultIdentity<ApplicationUser>()
				.AddEntityFrameworkStores<AppDbContext>();

			services.AddIdentityServer()
				.AddApiAuthorization<ApplicationUser, AppDbContext>();

			services.AddAuthentication()
				.AddIdentityServerJwt();

			services.AddScoped<IIdentityService, IdentityService>();

			return services;
		}
	}
}
