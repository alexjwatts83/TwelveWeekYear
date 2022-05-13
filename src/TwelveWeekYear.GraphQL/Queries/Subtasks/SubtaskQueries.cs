using HotChocolate;
using HotChocolate.Data;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Linq;
using TwelveWeekYear.Application.Interfaces;
using TwelveWeekYear.Domain.Models;

namespace TwelveWeekYear.GraphQL.Queries.Subtasks
{
	[ExtendObjectType(OperationTypeNames.Query)]
	public class SubtaskQueries : BaseGraphQLOperation
	{
		public SubtaskQueries(ILogger<BaseGraphQLOperation> logger, IAppDbContext dbContext)
			: base(logger, dbContext)
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
