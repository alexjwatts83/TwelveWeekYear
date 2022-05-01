using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore;
using Microsoft.Extensions.DependencyInjection;
using TwelveWeekYear.Infrastructure.Persistence;
using TwelveWeekYear.Infrastructure;

namespace TwelveWeekYear.GraphQL
{
	public class Program
    {
        public static void Main(string[] args)
        {
			var host = CreateWebHostBuilder(args).Build();

			using (var scope = host.Services.CreateScope())
			{
				var services = scope.ServiceProvider;

				try
				{
					var context = services
						.GetRequiredService<AppDbContext>();

					context.Database.Migrate();

					AppDbContextSeeder.Seed(context);
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

			host.Run();
		}

		public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
			WebHost.CreateDefaultBuilder(args)
				.UseStartup<Startup>();

		//public static IHostBuilder CreateHostBuilder(string[] args) =>
		//    Host.CreateDefaultBuilder(args)
		//        .ConfigureWebHostDefaults(webBuilder =>
		//        {
		//            webBuilder.UseStartup<Startup>();
		//        });
	}
}
