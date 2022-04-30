using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TwelveWeekYear.Application.Interfaces;
using TwelveWeekYear.Infrastructure.Persistence;
using TwelveWeekYear.Infrastructure.Persistence.Configuration;
using TwelveWeekYear.Infrastructure.Persistence.Repositories;

namespace TwelveWeekYear.Infrastructure
{
	public static class DependencyInjection
	{
		public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration config)
		{
			services.Configure<ConnectionStringSettings>(config.GetSection(ConnectionStringSettings.Section));

			services.AddDbContext<AppDbContext>(options =>
				options.UseSqlServer(
					config.GetConnectionString("DbConStr")));
			//services.AddPooledDbContextFactory<AppDbContext>(opt => opt.UseSqlServer(config.GetConnectionString("DbConStr")));

			services.AddScoped(typeof(IBaseRepository), typeof(BaseRepository));

			// Add SqlMapper.AddTypeHandler here

			return services;
		}
	}
}
