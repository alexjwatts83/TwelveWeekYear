using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TwelveWeekYear.Infrastructure.Persistence;

namespace TwelveWeekYear.GraphQL.Queries
{
	[ExtendObjectType(OperationTypeNames.Query)]
	public abstract class BaseQueries
	{
		public readonly ILogger<BaseQueries> logger;
		public readonly AppDbContext dbContext;

		public BaseQueries(ILogger<BaseQueries> logger, IDbContextFactory<AppDbContext> dbContextFactory)
		{
			logger = this.logger;
			dbContext = dbContextFactory.CreateDbContext();
		}
	}
}
