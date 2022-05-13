using GraphQL.Server.Ui.Voyager;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using TwelveWeekYear.Application.Interfaces;
using TwelveWeekYear.GraphQL.DependencyInjection;
using TwelveWeekYear.GraphQL.Services;
using TwelveWeekYear.Infrastructure;

namespace TwelveWeekYear.GraphQL
{
	public class Startup
    {
		private readonly IConfiguration _configuration;

		public Startup(IConfiguration configuration)
		{
			_configuration = configuration;
		}

		// This method gets called by the runtime. Use this method to add services to the container.
		// For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
		public void ConfigureServices(IServiceCollection services)
        {
			services.AddInfrastructure(_configuration);

			services.AddHttpContextAccessor();
			services.AddScoped<ICurrentUserService, CurrentUserService>();

			services.AddCustomGraphQLServer(_configuration);
		}

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

			app.UseEndpoints(endpoints => endpoints.MapGraphQL());

			app.UseGraphQLVoyager(new VoyagerOptions()
			{
				GraphQLEndPoint = "/graphql"
			}, "/graphql-voyager");
		}
    }
}
