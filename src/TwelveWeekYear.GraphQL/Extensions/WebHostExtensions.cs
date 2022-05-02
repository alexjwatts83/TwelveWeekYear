﻿using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using TwelveWeekYear.Infrastructure.Persistence;
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
				try
				{
					var dbContextFactory = services.GetRequiredService<IDbContextFactory<AppDbContext>>();
					var appDbContext = dbContextFactory.CreateDbContext();

					appDbContext.Database.Migrate();

					AppDbContextSeeder.Seed(appDbContext);

					return host;
				}
				catch (Exception ex)
				{
					var logger = services
						.GetRequiredService<ILogger<Program>>();

					logger.LogError(ex, "An error occurred while " +
						"migrating or initializing the database.");

					throw;
				}
			}
		}
	}
}