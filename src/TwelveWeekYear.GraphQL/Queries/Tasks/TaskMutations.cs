using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Threading;
using System.Threading.Tasks;
using TwelveWeekYear.Infrastructure.Persistence;

namespace TwelveWeekYear.GraphQL.Queries.Tasks
{
	public record AddTaskInput(string Description, int GoalId);
	public record AddTaskPayload(Domain.Models.Task task);

	[ExtendObjectType(OperationTypeNames.Mutation)]
	public class TaskMutations : BaseQueries
	{
		public TaskMutations(ILogger<BaseQueries> logger, IDbContextFactory<AppDbContext> dbContextFactory)
			: base(logger, dbContextFactory)
		{
		}

		public async Task<AddTaskPayload> AddGoalTask(AddTaskInput input, CancellationToken cancellationToke)
		{
			var goal = new Domain.Models.Task
			{
				Description = input.Description,
				GoalId = input.GoalId
			};

			dbContext.Tasks.Add(goal);

			await dbContext.SaveChangesAsync(cancellationToke);

			return new AddTaskPayload(goal);
		}
	}
}
