using HotChocolate;
using HotChocolate.Types;
using System.Linq;
using TwelveWeekYear.Application.Interfaces;
using TwelveWeekYear.Domain.Models;
using TwelveWeekYear.Infrastructure.Persistence;

namespace TwelveWeekYear.GraphQL.Queries.WeekDaySubtasksResults
{
	public class WeekDaySubtasksResultType : ObjectTypeExtension<WeekDaySubtasksResult>
	{
		protected override void Configure(IObjectTypeDescriptor<WeekDaySubtasksResult> descriptor)
		{
			descriptor.Description("WeekDaySubtasksResults");

			descriptor
				.Field(x => x.Id)
				.Description("Id of the WeekDaySubtasksResult");

			descriptor
				.Field(x => x.WeekNumber)
				.Description("WeekNumber for WeekDaySubtasksResult");

			descriptor
				.Field(x => x.Date)
				.Description("Date of the WeekDaySubtasksResult");

			descriptor
				.Field(x => x.Name)
				.Description("Honestly not sure how its used");

			descriptor
				.Field(x => x.Completed)
				.Description("If the subtask is completed or not");

			descriptor
				.Field(x => x.SubtaskId)
				.Description("Subtask Id");

			descriptor
				.Field(x => x.Subtask)
				.ResolveWith<Resolvers>(x => x.GetTaskForWeekDayTaskResult(default!, default!))
				.UseDbContext<AppDbContext>()
				.Description("The Subtask for the WeekDaySubtasksResult.");

			descriptor
				.Field(x => x.Goal)
				.ResolveWith<Resolvers>(x => x.GetGoalForWeekDayTaskResult(default!, default!))
				.UseDbContext<AppDbContext>()
				.Description("The Goal for the WeekDaySubtasksResult.");
		}

		private class Resolvers
		{
			public Subtask GetTaskForWeekDayTaskResult([Parent] WeekDaySubtasksResult WeekDaySubtasksResult, [ScopedService] IAppDbContext context)
			{
				return context.Subtasks.FirstOrDefault(x => x.Id == WeekDaySubtasksResult.SubtaskId);
			}

			public Goal GetGoalForWeekDayTaskResult([Parent] WeekDaySubtasksResult WeekDaySubtasksResult, [ScopedService] IAppDbContext context)
			{
				var subtask = context.Subtasks.FirstOrDefault(x => x.Id == WeekDaySubtasksResult.SubtaskId);
				if (subtask == null)
				{
					return null;
				}
				var task = context.Tasks.FirstOrDefault(x => x.Id == subtask.TaskId);
				if (task == null)
				{
					return null;
				}
				return context.Goals.FirstOrDefault(x => x.Id == task.GoalId);
			}
		}
	}
}
