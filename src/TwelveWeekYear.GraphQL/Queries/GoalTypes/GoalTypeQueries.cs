using HotChocolate;
using HotChocolate.Data;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Linq;
using TwelveWeekYear.Application.Interfaces;
using TwelveWeekYear.Domain.Models;
using TwelveWeekYear.Infrastructure.Persistence;

namespace TwelveWeekYear.GraphQL.Queries.GoalTypes
{
	[ExtendObjectType(OperationTypeNames.Query)]
	public class GoalTypeQueries : BaseGraphQLOperation
	{
		public GoalTypeQueries(ILogger<BaseGraphQLOperation> logger, IAppDbContext dbContext)
			: base(logger, dbContext)
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
