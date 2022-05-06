using HotChocolate;
using HotChocolate.Data;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Linq;
using TwelveWeekYear.Domain.Models;
using TwelveWeekYear.Infrastructure.Persistence;

namespace TwelveWeekYear.GraphQL.Queries.GoalTypes
{
	[ExtendObjectType(OperationTypeNames.Query)]
	public class GoalTypeQueries : BaseQueries
	{
		public GoalTypeQueries(ILogger<BaseQueries> logger, IDbContextFactory<AppDbContext> dbContextFactory)
			: base(logger, dbContextFactory)
		{
		}

		[GraphQLDescription("Gets the Goal Types")]
		[UseFiltering]
		[UseSorting]
		public IQueryable<GoalType> GetGoalTypes()
		{
			logger.LogInformation("Calling GetGoalTypes");
			return dbContext.GoalTypes.AsNoTracking();
		}
	}
}
