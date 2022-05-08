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

namespace TwelveWeekYear.GraphQL.Mutations.TweleveWeekYearWeeks
{
	// Add
	public record AddTweleveWeekYearWeekInput(int WeekNumber, DateTime Date, int TweleveWeekYearId);
	public record AddTweleveWeekYearWeekPayload(TweleveWeekYearWeek TweleveWeekYearWeek);

	// Update
	public record UpdateTweleveWeekYearWeekInput(int WeekNumber, DateTime Date, int TweleveWeekYearId, int TweleveWeekYearWeekId);
	public record UpdateTweleveWeekYearWeekPayload(TweleveWeekYearWeek TweleveWeekYearWeek);

	[ExtendObjectType(OperationTypeNames.Mutation)]
	public class TweleveWeekYearWeekMutations : BaseGraphQLOperation
	{
		public TweleveWeekYearWeekMutations(ILogger<BaseGraphQLOperation> logger, IDbContextFactory<AppDbContext> dbContextFactory)
			: base(logger, dbContextFactory)
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
