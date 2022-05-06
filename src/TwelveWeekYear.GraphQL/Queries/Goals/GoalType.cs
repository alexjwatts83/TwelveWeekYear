using HotChocolate;
using HotChocolate.Types;
using System.Linq;
using TwelveWeekYear.Domain.Models;
using TwelveWeekYear.Infrastructure.Persistence;

namespace TwelveWeekYear.GraphQL.Queries.Goals
{
	public class GoalType : ObjectTypeExtension<Goal>
	{
		protected override void Configure(IObjectTypeDescriptor<Goal> descriptor)
		{
			descriptor.Description("Various types of Goals");

			descriptor
				.Field(x => x.Id)
				.Description("Id of the Goal");

			descriptor
				.Field(x => x.Name)
				.Description("Name of the Goal");

			descriptor
				.Field(x => x.Description)
				.Description("Description of the Goal");

			descriptor
				.Field(x => x.GoalTypeId)
				.Description("Id of the Goal Type for the Goal");

			descriptor
				.Field(x => x.GoalType)
				.ResolveWith<Resolvers>(x => x.GetGoalType(default!, default!))
				.UseDbContext<AppDbContext>()
				.Description("The Goal Type.");

			//descriptor.Field(x => x.Tasks).Ignore();
			descriptor
				.Field(x => x.Tasks)
				.ResolveWith<Resolvers>(x => x.GetGoalTasks(default!, default!))
				.UseDbContext<AppDbContext>()
				.Description("Tasks for a Goal.");

			descriptor.Field(x => x.TweleveWeekYearId).Ignore();
			descriptor.Field(x => x.TweleveWeekYear).Ignore();
		}

		private class Resolvers
		{
			public Domain.Models.GoalType GetGoalType([Parent] Goal goal, [ScopedService] AppDbContext context)
			{
				return context.GoalTypes.FirstOrDefault(p => p.Id == goal.GoalTypeId);
			}

			public IQueryable<Task> GetGoalTasks([Parent] Goal goal, [ScopedService] AppDbContext context)
			{
				return context.Tasks.Where(x => x.GoalId == goal.Id);
			}
		}
	}
}
