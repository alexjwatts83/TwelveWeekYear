using HotChocolate;
using HotChocolate.Data;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Linq;
using TwelveWeekYear.Domain.Models;
using TwelveWeekYear.Infrastructure.Persistence;

namespace TwelveWeekYear.GraphQL.Queries.Tasks
{
	[ExtendObjectType(OperationTypeNames.Query)]
	public class TaskQueries : BaseQueries
	{
		public TaskQueries(ILogger<BaseQueries> logger, IDbContextFactory<AppDbContext> dbContextFactory)
			: base(logger, dbContextFactory)
		{
		}

		[GraphQLDescription("Gets the queryable goals.")]
		[UseFiltering]
		[UseSorting]
		public IQueryable<Task> GetTasks()
		{
			logger.LogInformation("Calling Tasks");
			return dbContext.Tasks;
		}
	}
}
