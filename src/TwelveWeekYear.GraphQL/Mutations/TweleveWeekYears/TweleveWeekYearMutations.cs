using HotChocolate;
using HotChocolate.Types;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TwelveWeekYear.Application.Interfaces;
using TwelveWeekYear.Domain.Models;

namespace TwelveWeekYear.GraphQL.Mutations.TweleveWeekYears
{
	// Add
	[GraphQLDescription("Add Twelve Week Year Parameters.")]
	public record AddTweleveWeekYearInput(string Name, string Description, DateTime StartDate, DateTime EndDate, List<int> GoalIds);
	[GraphQLDescription("Add Twelve Week Year Payload.")]
	public record AddTweleveWeekYearPayload(TweleveWeekYear TweleveWeekYear);

	// Update
	[GraphQLDescription("Update Twelve Week Year Parameters.")]
	public record UpdateTweleveWeekYearInput(string Name, string Description, DateTime StartDate, DateTime EndDate, List<int> GoalIds, int tweleveWeekYearId);
	[GraphQLDescription("Update Twelve Week Year Payload.")]
	public record UpdateTweleveWeekYearPayload(TweleveWeekYear tweleveWeekYear);

	[ExtendObjectType(OperationTypeNames.Mutation)]
	public class TweleveWeekYearMutations : BaseGraphQLOperation
	{
		public TweleveWeekYearMutations(ILogger<BaseGraphQLOperation> logger, IAppDbContext dbContext)
			: base(logger, dbContext)
		{
		}

		[GraphQLDescription("Add Twelve Week Year.")]
		public async Task<AddTweleveWeekYearPayload> AddTwelveWeekYear(AddTweleveWeekYearInput input, CancellationToken cancellationToke)
		{
			var item = new TweleveWeekYear
			{
				Name = input.Name,
				Description = input.Description,
				StartDate = input.StartDate,
				EndDate = input.EndDate,
			};

			dbContext.TweleveWeekYears.Add(item);

			await dbContext.SaveChangesAsync(cancellationToke);

			foreach (var goalId in input.GoalIds)
			{
				UpdateStuff(goalId, item.Id);
			}

			await dbContext.SaveChangesAsync(cancellationToke);

			return new AddTweleveWeekYearPayload(item);
		}

		[GraphQLDescription("Update Tweleve Week Year")]
		public async Task<UpdateTweleveWeekYearPayload> UpdateTweleveWeekYearAndGoals(UpdateTweleveWeekYearInput input, CancellationToken cancellationToken)
		{
			var item = dbContext.TweleveWeekYears.FirstOrDefault(x => x.Id == input.tweleveWeekYearId);
			if (item == null)
			{
				logger.LogWarning("TweleveWeekYear was null with the given id");
				return new UpdateTweleveWeekYearPayload(item);
			}

			item.Name = input.Name;
			item.Description = input.Description;
			item.StartDate = input.StartDate;
			item.EndDate = input.EndDate;

			foreach (var goalId in input.GoalIds)
			{
				UpdateStuff(goalId, input.tweleveWeekYearId);
			}

			var res = dbContext.TweleveWeekYears.Update(item);

			item = res.Entity;

			await dbContext.SaveChangesAsync(cancellationToken);

			return new UpdateTweleveWeekYearPayload(item);
		}

		private void UpdateStuff(int GoalId, int TweleveWeekYearId)
		{
			if (TweleveWeekYearId <= 0)
			{
				logger.LogWarning("Id was null");
				return;
			}

			var item = dbContext.Goals.FirstOrDefault(x => x.Id == GoalId);

			if (item == null)
			{
				logger.LogWarning("Goal was null with the given id");
				return;
			}

			item.TweleveWeekYearId = TweleveWeekYearId;

			var res = dbContext.Goals.Update(item);
		}
	}
}
