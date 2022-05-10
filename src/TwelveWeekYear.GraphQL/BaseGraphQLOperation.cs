using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TwelveWeekYear.Application.Interfaces;
using TwelveWeekYear.Infrastructure.Persistence;

namespace TwelveWeekYear.GraphQL
{
	public abstract class BaseGraphQLOperation
	{
		public readonly ILogger<BaseGraphQLOperation> logger;
		public readonly IAppDbContext dbContext;

		protected BaseGraphQLOperation(ILogger<BaseGraphQLOperation> logger, IAppDbContext dbContext)
		{
			this.logger = logger;
			this.dbContext = dbContext;
		}
	}
}
