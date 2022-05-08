using HotChocolate;
using HotChocolate.Data;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Linq;
using TwelveWeekYear.Domain.Models;
using TwelveWeekYear.Infrastructure.Persistence;

namespace TwelveWeekYear.GraphQL.Queries.WeekDaySubtasksResults
{
	[ExtendObjectType(OperationTypeNames.Query)]
	public class WeekDaySubtasksResultQueries : BaseGraphQLOperation
	{
		public WeekDaySubtasksResultQueries(ILogger<BaseGraphQLOperation> logger, IDbContextFactory<AppDbContext> dbContextFactory)
			: base(logger, dbContextFactory)
		{
		}

		[GraphQLDescription("Gets the queryable Tweleve Week Year Weeks.")]
		[UseFiltering]
		[UseSorting]
		public IQueryable<WeekDaySubtasksResult> GetWeekDaySubtasksResult()
		{
			logger.LogInformation("Calling WeekDaySubtasksResult");
			return dbContext.WeekDaySubtasksResults.AsNoTracking();
		}
	}
}
