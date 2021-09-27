using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using TwelveWeekYear.Application.Interfaces;
using TwelveWeekYear.Infrastructure.Persistence.Configuration;
using TwelveWeekYear.Infrastructure.Persistence.Repositories;

namespace TwelveWeekYear.Infrastructure
{
	public static class DependencyInjection
	{
		public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration config)
		{
			services.Configure<ConnectionStringSettings>(config.GetSection(ConnectionStringSettings.Section));

			services.AddScoped(typeof(IBaseRepository), typeof(BaseRepository));

			//SqlMapper.AddTypeHandler(typeof(IEnumerable<TodoItem>), new JsonObjectTypeHandler());

			return services;
		}
	}
}
