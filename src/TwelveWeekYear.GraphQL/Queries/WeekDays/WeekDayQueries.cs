using HotChocolate;
using HotChocolate.Data;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Linq;
using TwelveWeekYear.Domain.Models;
using TwelveWeekYear.Infrastructure.Persistence;

namespace TwelveWeekYear.GraphQL.Queries.WeekDays
{
	[ExtendObjectType(OperationTypeNames.Query)]
	public class WeekDayQueries : BaseGraphQLOperation
	{
		public WeekDayQueries(ILogger<BaseGraphQLOperation> logger, IDbContextFactory<AppDbContext> dbContextFactory)
			: base(logger, dbContextFactory)
		{
		}

		[GraphQLDescription("Gets the queryable Tweleve Week Year Weeks.")]
		[UseFiltering]
		[UseSorting]
		public IQueryable<WeekDay> GetWeekDays()
		{
			logger.LogInformation("Calling WeekDays");
			return dbContext.WeekDays.AsNoTracking();
		}
	}
}
