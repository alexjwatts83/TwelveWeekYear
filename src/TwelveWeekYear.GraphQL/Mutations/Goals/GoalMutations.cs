using HotChocolate;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TwelveWeekYear.Application.Interfaces;
using TwelveWeekYear.Domain.Models;
using TwelveWeekYear.Infrastructure.Persistence;

namespace TwelveWeekYear.GraphQL.Mutations.Goals
{
	[GraphQLDescription("Add Goal Parameters.")]
	public record AddGoalInput(string Name, string Description, int GoalTypeId);
	[GraphQLDescription("Add Goal Payload.")]
	public record AddGoalPayload(Goal goal);
	[GraphQLDescription("Update Goal Parameters.")]
	public record UpdateGoalInput(string Name, string Description, int? GoalTypeId, int GoalId);
	[GraphQLDescription("Update Goal Payload.")]
	public record UpdateGoalPayload(Goal goal);

	[ExtendObjectType(OperationTypeNames.Mutation)]
	public class GoalMutations : BaseGraphQLOperation
	{
		public GoalMutations(ILogger<BaseGraphQLOperation> logger, IAppDbContext dbContext)
			: base(logger, dbContext)
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
