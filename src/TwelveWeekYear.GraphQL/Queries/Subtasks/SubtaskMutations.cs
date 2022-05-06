using HotChocolate;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TwelveWeekYear.Domain.Models;
using TwelveWeekYear.Infrastructure.Persistence;

namespace TwelveWeekYear.GraphQL.Queries.Subtasks
{
	public record AddSubtaskInput(string Description, int TaskId);
	public record AddSubtaskPayload(Subtask subtask);

	[ExtendObjectType(OperationTypeNames.Mutation)]

	public class SubtaskMutations : BaseQueries
	{
		public SubtaskMutations(ILogger<BaseQueries> logger, IDbContextFactory<AppDbContext> dbContextFactory)
			: base(logger, dbContextFactory)
		{
		}

		[GraphQLDescription("Add Subtasks to a Task.")]
		public async Task<AddSubtaskPayload> AddSubtaskToTask(AddSubtaskInput input, CancellationToken cancellationToke)
		{
			var item = new Domain.Models.Subtask
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
