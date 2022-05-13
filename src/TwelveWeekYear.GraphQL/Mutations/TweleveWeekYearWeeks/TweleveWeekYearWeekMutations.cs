using HotChocolate;
using HotChocolate.Types;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TwelveWeekYear.Application.Interfaces;
using TwelveWeekYear.Domain.Models;

namespace TwelveWeekYear.GraphQL.Mutations.TweleveWeekYearWeeks
{
	// Add
	[GraphQLDescription("Add Twelve Week Year Week Parameters.")]
	public record AddTweleveWeekYearWeekInput(int WeekNumber, DateTime Date, int TweleveWeekYearId);
	[GraphQLDescription("Add Twelve Week Year Week Payload.")]
	public record AddTweleveWeekYearWeekPayload(TweleveWeekYearWeek TweleveWeekYearWeek);

	// Update
	[GraphQLDescription("Add Twelve Week Year Week Parameters.")]
	public record UpdateTweleveWeekYearWeekInput(int WeekNumber, DateTime Date, int TweleveWeekYearId, int TweleveWeekYearWeekId);
	[GraphQLDescription("Add Twelve Week Year Week Parameters.")]
	public record UpdateTweleveWeekYearWeekPayload(TweleveWeekYearWeek TweleveWeekYearWeek);

	[ExtendObjectType(OperationTypeNames.Mutation)]
	public class TweleveWeekYearWeekMutations : BaseGraphQLOperation
	{
		public TweleveWeekYearWeekMutations(ILogger<BaseGraphQLOperation> logger, IAppDbContext dbContext)
			: base(logger, dbContext)
		{
		}

		[GraphQLDescription("Add Twelve Week Year.")]
		public async Task<AddTweleveWeekYearWeekPayload> AddTwelveWeekYearWeek(AddTweleveWeekYearWeekInput input, CancellationToken cancellationToke)
		{
			var item = new TweleveWeekYearWeek
			{
				WeekNumber = input.WeekNumber,
				Date = input.Date,
				TweleveWeekYearId = input.TweleveWeekYearId
			};

			dbContext.TweleveWeekYearWeeks.Add(item);

			await dbContext.SaveChangesAsync(cancellationToke);

			return new AddTweleveWeekYearWeekPayload(item);
		}

		[GraphQLDescription("Update TweleveWeekYearWeek")]
		public async Task<UpdateTweleveWeekYearWeekPayload> UpdateTweleveWeekYearWeek(UpdateTweleveWeekYearWeekInput input, CancellationToken cancellationToken)
		{
			var item = dbContext.TweleveWeekYearWeeks.FirstOrDefault(x => x.Id == input.TweleveWeekYearWeekId);
			if (item == null)
			{
				logger.LogWarning("TweleveWeekYearWeek was null with the given id");
				return new UpdateTweleveWeekYearWeekPayload(item);
			}

			item.Date = input.Date;
			item.WeekNumber = input.WeekNumber;
			item.TweleveWeekYearId = input.TweleveWeekYearId;

			var res = dbContext.TweleveWeekYearWeeks.Update(item);

			item = res.Entity;

			await dbContext.SaveChangesAsync(cancellationToken);

			return new UpdateTweleveWeekYearWeekPayload(item);
		}
	}
}
