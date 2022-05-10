using HotChocolate;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TwelveWeekYear.Application.Interfaces;
using TwelveWeekYear.Infrastructure.Persistence;

namespace TwelveWeekYear.GraphQL.Mutations.Tasks
{
	public record AddTaskInput(string Description, int GoalId);
	public record AddTaskPayload(Domain.Models.Task task);

	public record UpdateTaskInput(string Description, int TaskId);
	public record UpdateTaskPayload(Domain.Models.Task task);

	[ExtendObjectType(OperationTypeNames.Mutation)]
	public class TaskMutations : BaseGraphQLOperation
	{
		public TaskMutations(ILogger<BaseGraphQLOperation> logger, IAppDbContext dbContext)
			: base(logger, dbContext)
		{
		}
		[GraphQLDescription("Add Goals to a Task.")]
		public async Task<AddTaskPayload> AddGoalToTask(AddTaskInput input, CancellationToken cancellationToken)
		{
			var task = new Domain.Models.Task
			{
				Description = input.Description,
				GoalId = input.GoalId
			};

			dbContext.Tasks.Add(task);

			await dbContext.SaveChangesAsync(cancellationToken);

			return new AddTaskPayload(task);
		}

		[GraphQLDescription("Update task.")]
		public async Task<UpdateTaskPayload> UpdateTask(UpdateTaskInput input, CancellationToken cancellationToken)
		{
			var task = dbContext.Tasks.FirstOrDefault(x => x.Id == input.TaskId);
			if (task == null)
			{
				logger.LogWarning("task was null");
				return new UpdateTaskPayload(task);
			}
			logger.LogInformation($"Input Description: {input.Description}");

			task.Description = input.Description;

			var res = dbContext.Tasks.Update(task);

			task = res.Entity;

			logger.LogInformation($"Updated Description: {task.Description}");

			await dbContext.SaveChangesAsync(cancellationToken);

			return new UpdateTaskPayload(task);
		}
	}
}
