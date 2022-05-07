using HotChocolate;
using HotChocolate.Data;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Linq;
using TwelveWeekYear.Domain.Models;
using TwelveWeekYear.Infrastructure.Persistence;

namespace TwelveWeekYear.GraphQL.Queries.WeekDayTasksResults
{
	[ExtendObjectType(OperationTypeNames.Query)]
	public class WeekDayTasksResultQueries : BaseQueries
	{
		public WeekDayTasksResultQueries(ILogger<BaseQueries> logger, IDbContextFactory<AppDbContext> dbContextFactory)
			: base(logger, dbContextFactory)
		{
		}

		[GraphQLDescription("Gets the queryable Tweleve Week Year Weeks.")]
		[UseFiltering]
		[UseSorting]
		public IQueryable<WeekDayTasksResult> GetWeekDayTasksResult()
		{
			logger.LogInformation("Calling WeekDayTasksResult");
			return dbContext.WeekDayTasksResults.AsNoTracking();
		}
	}
}
