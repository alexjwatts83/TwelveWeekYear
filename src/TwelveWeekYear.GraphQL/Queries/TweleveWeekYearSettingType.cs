using HotChocolate.Types;
using TwelveWeekYear.Domain.Models;

namespace TwelveWeekYear.GraphQL.Queries
{
	public class TweleveWeekYearSettingType : ObjectType<TweleveWeekYearSetting>
	{
		protected override void Configure(IObjectTypeDescriptor<TweleveWeekYearSetting> descriptor)
		{
			descriptor.Description("Common Settings for Tweleve Week Years");

			descriptor
				.Field(x => x.Id)
				.Description("Id of the Settings, should only be one though lols");

			descriptor
				.Field(x => x.WeeksCount)
				.Description("Number of Weeks in a Tweleve Week Year, should also be 12, " +
					"seems crazy to not be 12 but just in case someone wants a smaller week");
		}
	}
}
