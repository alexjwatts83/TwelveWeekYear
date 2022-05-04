using GraphQL.Server.Ui.Voyager;
using HotChocolate.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using TwelveWeekYear.GraphQL.Queries.GoalTypes;
using TwelveWeekYear.GraphQL.Queries.TweleveWeekYearSettings;
using TwelveWeekYear.Infrastructure;
using TwelveWeekYear.Infrastructure.Persistence;

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

			services.AddScoped<GoalTypeQueries>();
			services.AddScoped<TweleveWeekYearSettingQueries>();

			services
				.AddGraphQLServer()
				.ModifyRequestOptions(opt => opt.IncludeExceptionDetails = true)
				.RegisterDbContext<AppDbContext>(DbContextKind.Pooled)
				.AddQueryType(q => q.Name("Query"))
				.AddTypeExtension<GoalTypeQueries>()
				.AddTypeExtension<TweleveWeekYearSettingQueries>()
				.AddType<GoalTypeType>()
				.AddType<TweleveWeekYearSettingType>()
				.AddFiltering()
				.AddSorting();
				//.AddInMemorySubscriptions();
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
