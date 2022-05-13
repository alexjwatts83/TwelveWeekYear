using HotChocolate;
using HotChocolate.Data;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Linq;
using TwelveWeekYear.Application.Interfaces;
using TwelveWeekYear.Domain.Models;

namespace TwelveWeekYear.GraphQL.Queries.TweleveWeekYearWeeks
{
	[ExtendObjectType(OperationTypeNames.Query)]
	public class TweleveWeekYearWeekQueries : BaseGraphQLOperation
	{
		public TweleveWeekYearWeekQueries(ILogger<BaseGraphQLOperation> logger, IAppDbContext dbContext)
			: base(logger, dbContext)
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
