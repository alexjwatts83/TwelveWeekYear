using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Threading;
using System.Threading.Tasks;
using TwelveWeekYear.Domain.Models;
using TwelveWeekYear.Infrastructure.Persistence;

namespace TwelveWeekYear.GraphQL.Queries.Goals
{
	public record AddGoalInput(string Name, string Description, int GoalTypeId);
	public record AddGoalPayload(Goal goal);

	[ExtendObjectType(OperationTypeNames.Mutation)]
	public class GoalMutations : BaseQueries
	{
		public GoalMutations(ILogger<BaseQueries> logger, IDbContextFactory<AppDbContext> dbContextFactory)
			: base(logger, dbContextFactory)
		{
		}

		public async Task<AddGoalPayload> AddGoal(AddGoalInput input, CancellationToken cancellationToke)
		{
			var goal = new Goal
			{
				Name = input.Name,
				Description = input.Description,
				GoalTypeId = input.GoalTypeId
			};

			dbContext.Goals.Add(goal);

			await dbContext.SaveChangesAsync(cancellationToke);

			return new AddGoalPayload(goal);
		}
	}
}
