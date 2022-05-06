using HotChocolate;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TwelveWeekYear.Domain.Models;
using TwelveWeekYear.Infrastructure.Persistence;

namespace TwelveWeekYear.GraphQL.Queries.Goals
{
	public record AddGoalInput(string Name, string Description, int GoalTypeId);
	public record AddGoalPayload(Goal goal);

	public record UpdateGoalInput(string Name, string Description, int? GoalTypeId, int GoalId);
	public record UpdateGoalPayload(Goal goal);

	[ExtendObjectType(OperationTypeNames.Mutation)]
	public class GoalMutations : BaseQueries
	{
		public GoalMutations(ILogger<BaseQueries> logger, IDbContextFactory<AppDbContext> dbContextFactory)
			: base(logger, dbContextFactory)
		{
		}

		[GraphQLDescription("Add Goal.")]
		public async Task<AddGoalPayload> AddGoal(AddGoalInput input, CancellationToken cancellationToke)
		{
			var goal = new Goal
			{
				Name = input.Name,
				Description = input.Description,
				GoalTypeId = input.GoalTypeId
			};

			dbContext.Goals.Add(goal);

			await dbContext.SaveChangesAsync(cancellationToke);

			return new AddGoalPayload(goal);
		}

		[GraphQLDescription("Update Goal.")]
		public async Task<UpdateGoalPayload> UpdateGoal(UpdateGoalInput input, CancellationToken cancellationToken)
		{
			var item = dbContext.Goals.FirstOrDefault(x => x.Id == input.GoalId);
			if (item == null)
			{
				logger.LogWarning("Goal was null with the given id");
				return new UpdateGoalPayload(item);
			}

			logger.LogInformation($"Input Description: {input.Description}");

			if (!string.IsNullOrEmpty(input.Description))
			{
				item.Description = input.Description;
			}
			if (!string.IsNullOrEmpty(input.Name))
			{
				item.Name = input.Name;
			}
			if (input.GoalTypeId.HasValue)
			{
				item.GoalTypeId = input.GoalTypeId.Value;
			}

			var res = dbContext.Goals.Update(item);

			item = res.Entity;

			await dbContext.SaveChangesAsync(cancellationToken);

			return new UpdateGoalPayload(item);
		}
	}
}
