using HotChocolate;
using HotChocolate.Types;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;
using TwelveWeekYear.Application.Interfaces;
using TwelveWeekYear.Domain.Models;

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
					//.UseDbContext<AppDbContext>()
					.UseScopedService<IAppDbContext>(
					create: s => s.GetRequiredService<IAppDbContext>(),
					disposeAsync: (s, c) => c.DisposeAsync())
				.Description("The Goal Type.");

			descriptor
				.Field(x => x.Tasks)
				.ResolveWith<Resolvers>(x => x.GetGoalTasks(default!, default!))
				//.UseScopedService<IAppDbContext>(
				//	create: s => s.GetRequiredService<IAppDbContext>())
				//.UseDbContext<AppDbContext>()
				.Description("Tasks for a Goal.");

			descriptor
				.Field(x => x.TweleveWeekYearId)
				.Description("Id of the Twelve Week Year");

			descriptor
				.Field(x => x.TweleveWeekYear)
				.ResolveWith<Resolvers>(x => x.GetGoalTweleveWeekYear(default!, default!))
					//.UseDbContext<AppDbContext>()
					//.UseScopedService<IAppDbContext>(
					//create: s => s.GetRequiredService<IAppDbContext>())
				.Description("The TweleveWeekYear.");
		}

		private class Resolvers
		{
			//[UseAppDbContext]
			public Domain.Models.GoalType GetGoalType([Parent] Goal goal, [ScopedService] IAppDbContext context)
			{
				return context.GoalTypes.FirstOrDefault(p => p.Id == goal.GoalTypeId);
			}

			//[UseAppDbContext]
			public IQueryable<Task> GetGoalTasks([Parent] Goal goal, [ScopedService] IAppDbContext context)
			{
				return context.Tasks.Where(x => x.GoalId == goal.Id);
			}

			//[UseAppDbContext]
			public Domain.Models.TweleveWeekYear GetGoalTweleveWeekYear([Parent] Goal goal, [ScopedService] IAppDbContext context)
			{
				return context.TweleveWeekYears.FirstOrDefault(p => p.Id == goal.TweleveWeekYearId);
			}
		}
	}
}
