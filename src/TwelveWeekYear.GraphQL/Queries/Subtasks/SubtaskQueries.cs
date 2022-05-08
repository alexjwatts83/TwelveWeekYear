using HotChocolate;
using HotChocolate.Data;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Linq;
using TwelveWeekYear.Domain.Models;
using TwelveWeekYear.Infrastructure.Persistence;

namespace TwelveWeekYear.GraphQL.Queries.Subtasks
{
	[ExtendObjectType(OperationTypeNames.Query)]
	public class SubtaskQueries : BaseGraphQLOperation
	{
		public SubtaskQueries(ILogger<BaseGraphQLOperation> logger, IDbContextFactory<AppDbContext> dbContextFactory)
			: base(logger, dbContextFactory)
		{
		}

		[GraphQLDescription("Gets the queryable subtasks.")]
		[UseFiltering]
		[UseSorting]
		public IQueryable<Subtask> GetSubtasks()
		{
			logger.LogInformation("Calling Subtasks");
			return dbContext.Subtasks.AsNoTracking();
		}
	}
}
