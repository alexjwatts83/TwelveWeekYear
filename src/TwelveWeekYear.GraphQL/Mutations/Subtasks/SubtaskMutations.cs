using HotChocolate;
using HotChocolate.Types;
using Microsoft.Extensions.Logging;
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
	}
}
