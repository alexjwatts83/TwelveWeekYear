using HotChocolate;
using HotChocolate.Types;
using System.Linq;
using TwelveWeekYear.Domain.Models;
using TwelveWeekYear.Infrastructure.Persistence;

namespace TwelveWeekYear.GraphQL.Queries.Tasks
{
	public class TaskType : ObjectTypeExtension<Task>
	{
		protected override void Configure(IObjectTypeDescriptor<Task> descriptor)
		{
			descriptor.Description("Types of Tasks");

			descriptor
				.Field(x => x.Id)
				.Description("Id of the Task");

			descriptor
				.Field(x => x.Description)
				.Description("Description of the Task");


			descriptor
				.Field(x => x.GoalId)
				.Description("Id of the Goal");

			descriptor
				.Field(x => x.Goal)
				.ResolveWith<Resolvers>(x => x.GetGoalType(default!, default!))
				.UseDbContext<AppDbContext>()
				.Description("The Goal Type.");

			descriptor
				.Field(x => x.Subtasks)
				.ResolveWith<Resolvers>(x => x.GetSubtasksForTask(default!, default!))
				.UseDbContext<AppDbContext>()
				.Description("The Subtasks for the Task.");
		}

		private class Resolvers
		{
			public Goal GetGoalType([Parent] Task task, [ScopedService] AppDbContext context)
			{
				return context.Goals.FirstOrDefault(p => p.Id == task.GoalId);
			}

			public IQueryable<Subtask> GetSubtasksForTask([Parent] Task task, [ScopedService] AppDbContext context)
			{
				return context.Subtasks.Where(x => x.TaskId == task.Id);
			}
		}
	}
}
