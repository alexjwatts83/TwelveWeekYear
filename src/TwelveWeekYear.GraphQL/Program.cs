using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore;
using TwelveWeekYear.GraphQL.Extensions;

namespace TwelveWeekYear.GraphQL
{
	public class Program
    {
        public static void Main(string[] args)
		{
			CreateWebHostBuilder(args)
				.Build()
				.SeedAllTheThings()
				.Run();
		}

		public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
			WebHost.CreateDefaultBuilder(args)
				.UseStartup<Startup>();
	}
}
