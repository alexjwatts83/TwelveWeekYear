using GraphQL.Server.Ui.Voyager;
using HotChocolate.Data;
using HotChocolate.Types;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using TwelveWeekYear.GraphQL.Queries.Goals;
using TwelveWeekYear.GraphQL.Queries.GoalTypes;
using TwelveWeekYear.GraphQL.Queries.Subtasks;
using TwelveWeekYear.GraphQL.Queries.Tasks;
using TwelveWeekYear.GraphQL.Queries.TweleveWeekYears;
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

			services
				.AddGraphQLServer()
				.ModifyRequestOptions(opt => opt.IncludeExceptionDetails = true)
				.RegisterDbContext<AppDbContext>(DbContextKind.Pooled)

				.AddQueryType(q => q.Name(OperationTypeNames.Query))
				// Queries
				.AddTypeExtension<GoalTypeQueries>()
				.AddTypeExtension<TweleveWeekYearSettingQueries>()
				.AddTypeExtension<GoalQueries>()
				.AddTypeExtension<TaskQueries>()
				.AddTypeExtension<SubtaskQueries>()
				.AddTypeExtension<TweleveWeekYearQueries>()
				// Types
				.AddType<GoalTypeType>()
				.AddType<TweleveWeekYearSettingType>()
				.AddType<GoalType>()
				.AddType<TaskType>()
				.AddType<SubtaskType>()
				.AddType<TweleveWeekYearType>()
				// Mutations
				.AddMutationType(q => q.Name(OperationTypeNames.Mutation))
				.AddTypeExtension<GoalMutations>()
				.AddTypeExtension<TaskMutations>()
				.AddTypeExtension<SubtaskMutations>()
				.AddTypeExtension<TweleveWeekYearMutations>()

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
