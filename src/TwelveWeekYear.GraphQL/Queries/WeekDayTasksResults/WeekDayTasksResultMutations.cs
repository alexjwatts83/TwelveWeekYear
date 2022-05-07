using HotChocolate;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TwelveWeekYear.Domain.Models;
using TwelveWeekYear.Infrastructure.Persistence;

namespace TwelveWeekYear.GraphQL.Queries.WeekDayTasksResults
{
	// Add
	public record AddWeekDayTasksResultInput(int WeekNumber, DateTime Date, string Name, bool Completed, int TaskId);
	public record AddWeekDayTasksResultPayload(WeekDayTasksResult WeekDayTasksResult);

	// Update
	public record UpdateWeekDayTasksResultInput(int WeekNumber, DateTime Date, string Name, bool Completed, int TaskId, int WeekDayTasksResultId);
	public record UpdateWeekDayTasksResultPayload(WeekDayTasksResult WeekDayTasksResult);

	[ExtendObjectType(OperationTypeNames.Mutation)]
	public class WeekDayTasksResultMutations : BaseQueries
	{
		public WeekDayTasksResultMutations(ILogger<BaseQueries> logger, IDbContextFactory<AppDbContext> dbContextFactory)
			: base(logger, dbContextFactory)
		{
		}

		[GraphQLDescription("Add Week Day Task Result.")]
		public async Task<AddWeekDayTasksResultPayload> AddWeekDayTasksResult(AddWeekDayTasksResultInput input, CancellationToken cancellationToke)
		{
			var item = new WeekDayTasksResult
			{
				WeekNumber = input.WeekNumber,
				Date = input.Date,
				Name = input.Name,
				Completed = input.Completed,
				TaskId = input.TaskId
			};

			dbContext.WeekDayTasksResults.Add(item);

			await dbContext.SaveChangesAsync(cancellationToke);

			return new AddWeekDayTasksResultPayload(item);
		}

		[GraphQLDescription("Update Week Day Task Result")]
		public async Task<UpdateWeekDayTasksResultPayload> UpdateWeekDayTasksResult(
			UpdateWeekDayTasksResultInput input, CancellationToken cancellationToken)
		{
			var item = dbContext.WeekDayTasksResults.FirstOrDefault(x => x.Id == input.WeekDayTasksResultId);
			if (item == null)
			{
				logger.LogWarning("WeekDayTasksResult was null with the given id");
				return new UpdateWeekDayTasksResultPayload(item);
			}

			item.Date = input.Date;
			item.WeekNumber = input.WeekNumber;
			item.Name = input.Name;
			item.Completed = input.Completed;
			item.TaskId = input.TaskId;

			var res = dbContext.WeekDayTasksResults.Update(item);

			item = res.Entity;

			await dbContext.SaveChangesAsync(cancellationToken);

			return new UpdateWeekDayTasksResultPayload(item);
		}
	}
}
