using HotChocolate;
using HotChocolate.Data;
using System.Linq;
using TwelveWeekYear.Domain.Models;
using TwelveWeekYear.Infrastructure.Persistence;

namespace TwelveWeekYear.GraphQL
{
	[GraphQLDescription("Represents the queries available.")]
	public class Query
	{
		[UseDbContext(typeof(AppDbContext))]
		[UseFiltering]
		[UseSorting]
		[GraphQLDescription("Gets the queryable platform.")]
		public IQueryable<GoalType> GetGoalTypes([ScopedService] AppDbContext context)
		{
			return context.GoalTypes;
		}
	}
}
