﻿using HotChocolate;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TwelveWeekYear.Domain.Models;
using TwelveWeekYear.GraphQL.Queries;
using TwelveWeekYear.Infrastructure.Persistence;

namespace TwelveWeekYear.GraphQL.Mutations.WeekDaySubtasksResults
{
	// Add
	public record AddWeekDaySubtasksResultInput(int WeekNumber, DateTime Date, string Name, bool Completed, int SubtaskId);
	public record AddWeekDaySubtasksResultPayload(WeekDaySubtasksResult WeekDaySubtasksResult);

	// Update
	public record UpdateWeekDaySubtasksResultInput(int WeekNumber, DateTime Date, string Name, bool Completed, int SubtaskId, int WeekDaySubtasksResultId);
	public record UpdateWeekDaySubtasksResultPayload(WeekDaySubtasksResult WeekDaySubtasksResult);

	[ExtendObjectType(OperationTypeNames.Mutation)]
	public class WeekDaySubtasksResultMutations : BaseQueries
	{
		public WeekDaySubtasksResultMutations(ILogger<BaseQueries> logger, IDbContextFactory<AppDbContext> dbContextFactory)
			: base(logger, dbContextFactory)
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
