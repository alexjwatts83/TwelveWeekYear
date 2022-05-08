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

namespace TwelveWeekYear.GraphQL.Mutations.WeekDays
{
	// Add
	public record AddWeekDayInput(string Description, DateTime Date, int TweleveWeekYearWeekId);
	public record AddWeekDayPayload(WeekDay WeekDay);

	// Update
	public record UpdateWeekDayInput(string Description, DateTime Date, int TweleveWeekYearWeekId, int WeekDayId);
	public record UpdateWeekDayPayload(WeekDay WeekDay);

	[ExtendObjectType(OperationTypeNames.Mutation)]
	public class WeekDayMutations : BaseGraphQLOperation
	{
		public WeekDayMutations(ILogger<BaseGraphQLOperation> logger, IDbContextFactory<AppDbContext> dbContextFactory)
			: base(logger, dbContextFactory)
		{
		}

		[GraphQLDescription("Add Twelve Week Year.")]
		public async Task<AddWeekDayPayload> AddWeekDay(AddWeekDayInput input, CancellationToken cancellationToke)
		{
			var item = new WeekDay
			{
				Description = input.Description,
				Date = input.Date,
				TweleveWeekYearWeekId = input.TweleveWeekYearWeekId
			};

			dbContext.WeekDays.Add(item);

			await dbContext.SaveChangesAsync(cancellationToke);

			return new AddWeekDayPayload(item);
		}

		[GraphQLDescription("Update WeekDay")]
		public async Task<UpdateWeekDayPayload> UpdateWeekDay(UpdateWeekDayInput input, CancellationToken cancellationToken)
		{
			var item = dbContext.WeekDays.FirstOrDefault(x => x.Id == input.WeekDayId);
			if (item == null)
			{
				logger.LogWarning("WeekDay was null with the given id");
				return new UpdateWeekDayPayload(item);
			}

			item.Date = input.Date;
			item.Description = input.Description;
			item.TweleveWeekYearWeekId = input.TweleveWeekYearWeekId;

			var res = dbContext.WeekDays.Update(item);

			item = res.Entity;

			await dbContext.SaveChangesAsync(cancellationToken);

			return new UpdateWeekDayPayload(item);
		}
	}
}
