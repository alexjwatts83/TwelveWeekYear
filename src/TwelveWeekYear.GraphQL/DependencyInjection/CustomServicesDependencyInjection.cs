using Microsoft.Extensions.DependencyInjection;
using TwelveWeekYear.Application.Interfaces;
using TwelveWeekYear.GraphQL.Services;

namespace TwelveWeekYear.GraphQL.DependencyInjection
{
	public static class CustomServicesDependencyInjection
	{
		public static IServiceCollection AddCustomServices(this IServiceCollection services)
		{
			services.AddHttpContextAccessor();
			services.AddScoped<ICurrentUserService, CurrentUserService>();
			services.AddDatabaseDeveloperPageExceptionFilter();
			return services;
		}
	}
}
