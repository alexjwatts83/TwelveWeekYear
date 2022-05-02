using HotChocolate;
using HotChocolate.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Linq;
using TwelveWeekYear.Domain.Models;
using TwelveWeekYear.Infrastructure.Persistence;

namespace TwelveWeekYear.GraphQL
{
	[GraphQLDescription("Represents the queries available.")]
	public class Query
	{
		private readonly ILogger<Query> _logger;
		private readonly AppDbContext _dbContext;

		public Query(ILogger<Query> logger, IDbContextFactory<AppDbContext> dbContextFactory)
		{
			_logger = logger;
			_dbContext = dbContextFactory.CreateDbContext();
		}

		//[UseDbContext(typeof(AppDbContext))]
		//[UseFiltering]
		//[UseSorting]
		//[GraphQLDescription("Gets the queryable platform.")]
		//public IQueryable<GoalType> GetGoalTypes(AppDbContext context)
		//{
		//	_logger.LogInformation("Calling GetGoalTypes");
		//	return context.GoalTypes;
		//}

		[GraphQLDescription("Gets the queryable platform.")]
		[UseFiltering]
		[UseSorting]
		public IQueryable<GoalType> GetGoalTypes()
		{
			_logger.LogInformation("Calling GetGoalTypes");
			return _dbContext.GoalTypes;
		}
	}
}
