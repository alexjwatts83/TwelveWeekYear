using HotChocolate;
using HotChocolate.Data;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Linq;
using TwelveWeekYear.Domain.Models;
using TwelveWeekYear.Infrastructure.Persistence;

namespace TwelveWeekYear.GraphQL.Queries.TweleveWeekYearWeeks
{
	[ExtendObjectType(OperationTypeNames.Query)]
	public class TweleveWeekYearWeekQueries : BaseQueries
	{
		public TweleveWeekYearWeekQueries(ILogger<BaseQueries> logger, IDbContextFactory<AppDbContext> dbContextFactory)
			: base(logger, dbContextFactory)
		{
		}

		[GraphQLDescription("Gets the queryable Tweleve Week Year Weeks.")]
		[UseFiltering]
		[UseSorting]
		public IQueryable<TweleveWeekYearWeek> GetTweleveWeekYearWeeks()
		{
			logger.LogInformation("Calling TweleveWeekYearWeek");
			return dbContext.TweleveWeekYearWeeks.AsNoTracking();
		}
	}
}
