using HotChocolate;
using HotChocolate.Data;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Linq;
using TwelveWeekYear.Application.Interfaces;
using TwelveWeekYear.Domain.Models;

namespace TwelveWeekYear.GraphQL.Queries.WeekDays
{
	[ExtendObjectType(OperationTypeNames.Query)]
	public class WeekDayQueries : BaseGraphQLOperation
	{
		public WeekDayQueries(ILogger<BaseGraphQLOperation> logger, IAppDbContext dbContext)
			: base(logger, dbContext)
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
