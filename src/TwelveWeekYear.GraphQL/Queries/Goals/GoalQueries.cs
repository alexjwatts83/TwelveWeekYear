using HotChocolate;
using HotChocolate.Data;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Linq;
using TwelveWeekYear.Application.Interfaces;
using TwelveWeekYear.Domain.Models;
using TwelveWeekYear.Infrastructure.Persistence;

namespace TwelveWeekYear.GraphQL.Queries.Goals
{
	[ExtendObjectType(OperationTypeNames.Query)]
	public class GoalQueries : BaseGraphQLOperation
	{
		public GoalQueries(ILogger<BaseGraphQLOperation> logger, IAppDbContext dbContext)
			: base(logger, dbContext)
		{
		}

		[GraphQLDescription("Gets the queryable goals.")]
		[UseFiltering]
		[UseSorting]
		public IQueryable<Goal> GetGoals()
		{
			logger.LogInformation("Calling Goals");
			//return (IQueryable<Goal>)Enumerable.Empty<Goal>();
			var items = dbContext.Goals.AsNoTracking().Where(x => 1 == 1);

			foreach(var item in items)
			{
				logger.LogInformation($"[{item.Id}]Name:{item.Name},Description:{item.Description}");
			}

			return items;
		}
	}
}
