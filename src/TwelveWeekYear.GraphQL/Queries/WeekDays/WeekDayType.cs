using HotChocolate;
using HotChocolate.Types;
using System.Linq;
using TwelveWeekYear.Domain.Models;
using TwelveWeekYear.Infrastructure.Persistence;

namespace TwelveWeekYear.GraphQL.Queries.WeekDays
{
	public class WeekDayType : ObjectTypeExtension<WeekDay>
	{
		protected override void Configure(IObjectTypeDescriptor<WeekDay> descriptor)
		{
			descriptor.Description("Twleve Week Year Weeks");

			descriptor
				.Field(x => x.Id)
				.Description("Id of the Tweleve Week Year Week");

			descriptor
				.Field(x => x.Description)
				.Description("Description or comment for the day");

			descriptor
				.Field(x => x.Date)
				.Description("Date of the Tweleve Week Year Week");

			descriptor
				.Field(x => x.TweleveWeekYearWeek)
				.ResolveWith<Resolvers>(x => x.GetTweleveWeekYearForWeekDay(default!, default!))
				.UseDbContext<AppDbContext>()
				.Description("The TweleveWeekYearWeek for the WeekDay.");
		}

		private class Resolvers
		{
			public TweleveWeekYear GetTweleveWeekYearForWeekDay([Parent] WeekDay weekDay, [ScopedService] AppDbContext context)
			{
				return context.TweleveWeekYears.FirstOrDefault(x => x.Id == weekDay.TweleveWeekYearWeekId);
			}
		}
	}
}
