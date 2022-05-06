using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TwelveWeekYear.Infrastructure.Persistence;

namespace TwelveWeekYear.GraphQL.Queries
{
	public abstract class BaseQueries
	{
		public readonly ILogger<BaseQueries> logger;
		public readonly AppDbContext dbContext;

		public BaseQueries(ILogger<BaseQueries> logger, IDbContextFactory<AppDbContext> dbContextFactory)
		{
			this.logger = logger;
			dbContext = dbContextFactory.CreateDbContext();
		}
	}
}
