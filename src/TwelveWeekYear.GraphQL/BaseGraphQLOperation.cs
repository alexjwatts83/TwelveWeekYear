using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TwelveWeekYear.Infrastructure.Persistence;

namespace TwelveWeekYear.GraphQL
{
	public abstract class BaseGraphQLOperation
	{
		public readonly ILogger<BaseGraphQLOperation> logger;
		public readonly AppDbContext dbContext;

		protected BaseGraphQLOperation(ILogger<BaseGraphQLOperation> logger, IDbContextFactory<AppDbContext> dbContextFactory)
		{
			this.logger = logger;
			dbContext = dbContextFactory.CreateDbContext();
		}
	}
}
