using HotChocolate.Types;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TwelveWeekYear.GraphQL.Mutations.Goals;
using TwelveWeekYear.GraphQL.Mutations.Subtasks;
using TwelveWeekYear.GraphQL.Mutations.Tasks;
using TwelveWeekYear.GraphQL.Mutations.TweleveWeekYears;
using TwelveWeekYear.GraphQL.Mutations.TweleveWeekYearWeeks;
using TwelveWeekYear.GraphQL.Mutations.WeekDays;
using TwelveWeekYear.GraphQL.Mutations.WeekDaySubtasksResults;
using TwelveWeekYear.GraphQL.Mutations.WeekDayTasksResults;
using TwelveWeekYear.GraphQL.Queries.Goals;
using TwelveWeekYear.GraphQL.Queries.GoalTypes;
using TwelveWeekYear.GraphQL.Queries.Subtasks;
using TwelveWeekYear.GraphQL.Queries.Tasks;
using TwelveWeekYear.GraphQL.Queries.TweleveWeekYears;
using TwelveWeekYear.GraphQL.Queries.TweleveWeekYearSettings;
using TwelveWeekYear.GraphQL.Queries.TweleveWeekYearWeeks;
using TwelveWeekYear.GraphQL.Queries.WeekDays;
using TwelveWeekYear.GraphQL.Queries.WeekDaySubtasksResults;
using TwelveWeekYear.GraphQL.Queries.WeekDayTasksResults;
using TwelveWeekYear.Infrastructure.Persistence;

namespace TwelveWeekYear.GraphQL.DependencyInjection
{
	public static class GraphQLDependencyInjection
	{
		public static IServiceCollection AddCustomGraphQLServer(this IServiceCollection services, IConfiguration config)
		{
			// GraphQL services
			services
				.AddGraphQLServer()
				.ModifyRequestOptions(opt => opt.IncludeExceptionDetails = true)
				.RegisterDbContext<AppDbContext>()
				// Queries
				.AddQueryType(q => q.Name(OperationTypeNames.Query))
				.AddTypeExtension<GoalTypeQueries>()
				.AddTypeExtension<TweleveWeekYearSettingQueries>()
				.AddTypeExtension<GoalQueries>()
				.AddTypeExtension<TaskQueries>()
				.AddTypeExtension<SubtaskQueries>()
				.AddTypeExtension<TweleveWeekYearQueries>()
				.AddTypeExtension<TweleveWeekYearWeekQueries>()
				.AddTypeExtension<WeekDayQueries>()
				.AddTypeExtension<WeekDayTasksResultQueries>()
				.AddTypeExtension<WeekDaySubtasksResultQueries>()
				// Types
				.AddType<GoalTypeType>()
				.AddType<TweleveWeekYearSettingType>()
				.AddType<GoalType>()
				.AddType<TaskType>()
				.AddType<SubtaskType>()
				.AddType<TweleveWeekYearType>()
				.AddType<TweleveWeekYearWeekType>()
				.AddType<WeekDayType>()
				.AddType<WeekDayTasksResultType>()
				.AddType<WeekDaySubtasksResultType>()
				// Mutations
				.AddMutationType(q => q.Name(OperationTypeNames.Mutation))
				.AddTypeExtension<GoalMutations>()
				.AddTypeExtension<TaskMutations>()
				.AddTypeExtension<SubtaskMutations>()
				.AddTypeExtension<TweleveWeekYearMutations>()
				.AddTypeExtension<TweleveWeekYearWeekMutations>()
				.AddTypeExtension<WeekDayMutations>()
				.AddTypeExtension<WeekDayTasksResultMutations>()
				.AddTypeExtension<WeekDaySubtasksResultMutations>()
				// additional stuff
				.AddFiltering()
				.AddSorting();
			//.AddInMemorySubscriptions();

			return services;
		}
	}
}
