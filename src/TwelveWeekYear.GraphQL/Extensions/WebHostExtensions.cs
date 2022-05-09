using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using System;
using Microsoft.Extensions.DependencyInjection;
using TwelveWeekYear.Infrastructure;

namespace TwelveWeekYear.GraphQL.Extensions
{
	public static class WebHostExtensions
	{
		public static IWebHost SeedAllTheThings(this IWebHost host)
		{
			using (var scope = host.Services.CreateScope())
			{
				var services = scope.ServiceProvider;
				var logger = services.GetRequiredService<ILogger<Program>>();
				try
				{
					var initialiser = services
						.GetRequiredService<AppDbContextInitialiser>();

					initialiser.Initialise();
					initialiser.Seed();

					return host;
				}
				catch (Exception ex)
				{
					logger.LogError(ex, "An error occurred while " +
						"migrating or initializing the database.");

					throw;
				}
			}
		}
	}
}
