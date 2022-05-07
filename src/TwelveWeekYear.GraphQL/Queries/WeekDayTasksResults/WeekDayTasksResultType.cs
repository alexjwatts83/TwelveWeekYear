using HotChocolate;
using HotChocolate.Types;
using System.Linq;
using TwelveWeekYear.Domain.Models;
using TwelveWeekYear.Infrastructure.Persistence;

namespace TwelveWeekYear.GraphQL.Queries.WeekDayTasksResults
{
	public class WeekDayTasksResultType : ObjectTypeExtension<WeekDayTasksResult>
	{
		protected override void Configure(IObjectTypeDescriptor<WeekDayTasksResult> descriptor)
		{
			descriptor.Description("WeekDayTasksResults");

			descriptor
				.Field(x => x.Id)
				.Description("Id of the WeekDayTasksResult");

			descriptor
				.Field(x => x.WeekNumber)
				.Description("WeekNumber for WeekDayTasksResult");

			descriptor
				.Field(x => x.Date)
				.Description("Date of the WeekDayTasksResult");

			descriptor
				.Field(x => x.Name)
				.Description("Honestly not sure how its used");

			descriptor
				.Field(x => x.Completed)
				.Description("If the task is completed or not");

			descriptor
				.Field(x => x.TaskId)
				.Description("Task Id");

			descriptor
				.Field(x => x.Task)
				.ResolveWith<Resolvers>(x => x.GetTaskForWeekDayTaskResult(default!, default!))
				.UseDbContext<AppDbContext>()
				.Description("The Task for the WeekDayTasksResult.");

			descriptor
				.Field(x => x.Goal)
				.ResolveWith<Resolvers>(x => x.GetGoalForWeekDayTaskResult(default!, default!))
				.UseDbContext<AppDbContext>()
				.Description("The Goal for the WeekDayTasksResult.");
		}

		private class Resolvers
		{
			public Task GetTaskForWeekDayTaskResult([Parent] WeekDayTasksResult weekDayTasksResult, [ScopedService] AppDbContext context)
			{
				return context.Tasks.FirstOrDefault(x => x.Id == weekDayTasksResult.TaskId);
			}

			public Goal GetGoalForWeekDayTaskResult([Parent] WeekDayTasksResult weekDayTasksResult, [ScopedService] AppDbContext context)
			{
				var task = context.Tasks.FirstOrDefault(x => x.Id == weekDayTasksResult.TaskId);
				if (task == null)
				{
					return null;
				}
				return context.Goals.FirstOrDefault(x => x.Id == task.GoalId);
			}
		}
	}
}
