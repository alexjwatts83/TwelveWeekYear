using HotChocolate;
using HotChocolate.Types;
using System.Linq;
using TwelveWeekYear.Application.Interfaces;
using TwelveWeekYear.Domain.Models;
using TwelveWeekYear.Infrastructure.Persistence;

namespace TwelveWeekYear.GraphQL.Queries.Subtasks
{
	public class SubtaskType : ObjectTypeExtension<Subtask>
	{
		protected override void Configure(IObjectTypeDescriptor<Subtask> descriptor)
		{
			descriptor.Description("Types of Subtasks");

			descriptor
				.Field(x => x.Id)
				.Description("Id of the Subtask");

			descriptor
				.Field(x => x.Description)
				.Description("Description of the Subtask");


			descriptor
				.Field(x => x.TaskId)
				.Description("Id of the Task");

			descriptor
				.Field(x => x.Task)
				.ResolveWith<Resolvers>(x => x.GetTask(default!, default!))
				.UseDbContext<AppDbContext>()
				.Description("The Goal Type.");
		}

		private class Resolvers
		{
			public Task GetTask([Parent] Subtask subtask, [ScopedService] IAppDbContext context)
			{
				return context.Tasks.FirstOrDefault(x => x.Id == subtask.TaskId);
			}
		}
	}
}
