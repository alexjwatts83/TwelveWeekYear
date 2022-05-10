using HotChocolate;
using HotChocolate.Data;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Linq;
using TwelveWeekYear.Application.Interfaces;
using TwelveWeekYear.Domain.Models;
using TwelveWeekYear.Infrastructure.Persistence;

namespace TwelveWeekYear.GraphQL.Queries.WeekDaySubtasksResults
{
	[ExtendObjectType(OperationTypeNames.Query)]
	public class WeekDaySubtasksResultQueries : BaseGraphQLOperation
	{
		public WeekDaySubtasksResultQueries(ILogger<BaseGraphQLOperation> logger, IAppDbContext dbContext)
			: base(logger, dbContext)
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
