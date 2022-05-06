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

namespace TwelveWeekYear.GraphQL.Queries.TweleveWeekYears
{
	public record AddTweleveWeekYearInput(string Name, string Description, DateTime StartDate, DateTime EndDate, List<int> GoalIds);
	public record AddTweleveWeekYearPayload(TweleveWeekYear TweleveWeekYear);

	//public record UpdateTweleveWeekYearInput(string Name, string Description, DateTime StartDate, DateTime EndDate, int tweleveWeekYearId);
	//public record UpdateTweleveWeekYearload(TweleveWeekYear tweleveWeekYear);



	[ExtendObjectType(OperationTypeNames.Mutation)]
	public class TweleveWeekYearMutations : BaseQueries
	{
		public TweleveWeekYearMutations(ILogger<BaseQueries> logger, IDbContextFactory<AppDbContext> dbContextFactory)
			: base(logger, dbContextFactory)
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
