using HotChocolate;
using HotChocolate.Types;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TwelveWeekYear.Application.Interfaces;
using TwelveWeekYear.Domain.Models;

namespace TwelveWeekYear.GraphQL.Mutations.WeekDaySubtasksResults
{
	// Add
	[GraphQLDescription("Add Weekday Subtask Result Parameters.")]
	public record AddWeekDaySubtasksResultInput(int WeekNumber, DateTime Date, string Name, bool Completed, int SubtaskId);
	[GraphQLDescription("Add Weekday Subtask Result Payload.")]
	public record AddWeekDaySubtasksResultPayload(WeekDaySubtasksResult WeekDaySubtasksResult);

	// Update
	[GraphQLDescription("Update Weekday Subtask Result Parameters.")]
	public record UpdateWeekDaySubtasksResultInput(int WeekNumber, DateTime Date, string Name, bool Completed, int SubtaskId, int WeekDaySubtasksResultId);
	[GraphQLDescription("Update Weekday Subtask Result Payload.")]
	public record UpdateWeekDaySubtasksResultPayload(WeekDaySubtasksResult WeekDaySubtasksResult);

	[ExtendObjectType(OperationTypeNames.Mutation)]
	public class WeekDaySubtasksResultMutations : BaseGraphQLOperation
	{
		public WeekDaySubtasksResultMutations(ILogger<BaseGraphQLOperation> logger, IAppDbContext dbContext)
			: base(logger, dbContext)
		{
		}

		[GraphQLDescription("Add Week Day Subtask Result.")]
		public async Task<AddWeekDaySubtasksResultPayload> AddWeekDaySubtasksResult(AddWeekDaySubtasksResultInput input, CancellationToken cancellationToke)
		{
			var item = new WeekDaySubtasksResult
			{
				WeekNumber = input.WeekNumber,
				Date = input.Date,
				Name = input.Name,
				Completed = input.Completed,
				SubtaskId = input.SubtaskId
			};

			dbContext.WeekDaySubtasksResults.Add(item);

			await dbContext.SaveChangesAsync(cancellationToke);

			return new AddWeekDaySubtasksResultPayload(item);
		}

		[GraphQLDescription("Update Week Day Subtask Result")]
		public async Task<UpdateWeekDaySubtasksResultPayload> UpdateWeekDaySubtasksResult(
			UpdateWeekDaySubtasksResultInput input, CancellationToken cancellationToken)
		{
			var item = dbContext.WeekDaySubtasksResults.FirstOrDefault(x => x.Id == input.WeekDaySubtasksResultId);
			if (item == null)
			{
				logger.LogWarning("WeekDaySubtasksResult was null with the given id");
				return new UpdateWeekDaySubtasksResultPayload(item);
			}

			item.Date = input.Date;
			item.WeekNumber = input.WeekNumber;
			item.Name = input.Name;
			item.Completed = input.Completed;
			item.SubtaskId = input.SubtaskId;

			var res = dbContext.WeekDaySubtasksResults.Update(item);

			item = res.Entity;

			await dbContext.SaveChangesAsync(cancellationToken);

			return new UpdateWeekDaySubtasksResultPayload(item);
		}
	}
}
