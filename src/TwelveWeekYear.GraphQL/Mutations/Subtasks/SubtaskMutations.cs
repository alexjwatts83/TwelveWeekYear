using HotChocolate;
using HotChocolate.Types;
using Microsoft.Extensions.Logging;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TwelveWeekYear.Application.Interfaces;
using TwelveWeekYear.Domain.Models;

namespace TwelveWeekYear.GraphQL.Mutations.Subtasks
{
	[GraphQLDescription("Add Subtask Parameters.")]
	public record AddSubtaskInput(string Description, int TaskId);
	[GraphQLDescription("Add Subtask Payload.")]
	public record AddSubtaskPayload(Subtask subtask);
	[GraphQLDescription("Update Subtask Parameters.")]
	public record UpdateSubtaskInput(string Description, int TaskId, int SubtaskId);
	[GraphQLDescription("Update Subtask Payload.")]
	public record UpdateSubtaskPayload(Subtask subtask);

	[ExtendObjectType(OperationTypeNames.Mutation)]
	public class SubtaskMutations : BaseGraphQLOperation
	{
		public SubtaskMutations(ILogger<BaseGraphQLOperation> logger, IAppDbContext dbContext)
			: base(logger, dbContext)
		{
		}

		[GraphQLDescription("Add Subtasks to a Task.")]
		public async Task<AddSubtaskPayload> AddSubtaskToTask(AddSubtaskInput input, CancellationToken cancellationToke)
		{
			var item = new Subtask
			{
				Description = input.Description,
				TaskId = input.TaskId
			};

			dbContext.Subtasks.Add(item);

			await dbContext.SaveChangesAsync(cancellationToke);

			return new AddSubtaskPayload(item);
		}

		[GraphQLDescription("Update Subtask.")]
		public async Task<UpdateSubtaskPayload> UpdateTask(UpdateSubtaskInput input, CancellationToken cancellationToken)
		{
			var task = dbContext.Subtasks.FirstOrDefault(x => x.Id == input.SubtaskId);
			if (task == null)
			{
				logger.LogWarning("subtask was null");
				return new UpdateSubtaskPayload(task);
			}
			logger.LogInformation($"Input Description: {input.Description}");

			task.Description = input.Description;
			task.TaskId = input.TaskId;

			var res = dbContext.Subtasks.Update(task);

			task = res.Entity;

			logger.LogInformation($"Updated Description: {task.Description}");

			await dbContext.SaveChangesAsync(cancellationToken);

			return new UpdateSubtaskPayload(task);
		}
	}
}
