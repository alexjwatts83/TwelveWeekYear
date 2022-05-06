using HotChocolate.Types;
using TwelveWeekYear.Domain.Models;

namespace TwelveWeekYear.GraphQL.Queries.GoalTypes
{
	public class GoalTypeType : ObjectTypeExtension<GoalType>
	{
		protected override void Configure(IObjectTypeDescriptor<GoalType> descriptor)
		{
			descriptor.Description("Types of Goals in the system");

			descriptor
				.Field(x => x.Id)
				.Description("Id of the Goal Type");

			descriptor
				.Field(x => x.Name)
				.Description("Name of the Goal Type");
		}
	}
}
