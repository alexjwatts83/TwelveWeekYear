using HotChocolate;
using HotChocolate.Data;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Linq;
using TwelveWeekYear.Application.Interfaces;
using TwelveWeekYear.Domain.Models;

namespace TwelveWeekYear.GraphQL.Queries.Tasks
{
	[ExtendObjectType(OperationTypeNames.Query)]
	public class TaskQueries : BaseGraphQLOperation
	{
		public TaskQueries(ILogger<BaseGraphQLOperation> logger, IAppDbContext dbContext)
			: base(logger, dbContext)
		{
		}

		[GraphQLDescription("Gets the queryable Tasks.")]
		[UseFiltering]
		[UseSorting]
		public IQueryable<Task> GetTasks()
		{
			logger.LogInformation("Calling Tasks");
			return dbContext.Tasks.AsNoTracking();
		}
	}
}
