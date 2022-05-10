using HotChocolate;
using HotChocolate.Data;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Linq;
using TwelveWeekYear.Application.Interfaces;
using TwelveWeekYear.Domain.Models;
using TwelveWeekYear.Infrastructure.Persistence;

namespace TwelveWeekYear.GraphQL.Queries.TweleveWeekYears
{
	[ExtendObjectType(OperationTypeNames.Query)]
	public class TweleveWeekYearQueries : BaseGraphQLOperation
	{
		public TweleveWeekYearQueries(ILogger<BaseGraphQLOperation> logger, IAppDbContext dbContext)
			: base(logger, dbContext)
		{
		}

		[GraphQLDescription("Gets the queryable Tweleve Week Years.")]
		[UseFiltering]
		[UseSorting]
		public IQueryable<TweleveWeekYear> GetTweleveWeekYears()
		{
			logger.LogInformation("Calling TweleveWeekYear");
			return dbContext.TweleveWeekYears.AsNoTracking();
		}
	}
}
