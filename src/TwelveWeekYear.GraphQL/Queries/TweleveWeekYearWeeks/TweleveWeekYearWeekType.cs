using HotChocolate;
using HotChocolate.Types;
using System.Linq;
using TwelveWeekYear.Domain.Models;
using TwelveWeekYear.Infrastructure.Persistence;

namespace TwelveWeekYear.GraphQL.Queries.TweleveWeekYearWeeks
{
	public class TweleveWeekYearWeekType : ObjectTypeExtension<TweleveWeekYearWeek>
	{
		protected override void Configure(IObjectTypeDescriptor<TweleveWeekYearWeek> descriptor)
		{
			descriptor.Description("Twleve Week Year Weeks");

			descriptor
				.Field(x => x.Id)
				.Description("Id of the Tweleve Week Year Week");

			descriptor
				.Field(x => x.WeekNumber)
				.Description("Week Number of Tweleve Week Year");

			descriptor
				.Field(x => x.Date)
				.Description("Date of the Tweleve Week Year Week");

			descriptor
				.Field(x => x.TweleveWeekYearId)
				.Description("Id of the Tweleve Week Year");

			descriptor
				.Field(x => x.TweleveWeekYear)
				.ResolveWith<Resolvers>(x => x.GetTweleveWeekYearForTweleveWeekYearWeek(default!, default!))
				.UseDbContext<AppDbContext>()
				.Description("The TweleveWeekYear for the TweleveWeekYearWeek.");

			descriptor
				.Field(x => x.Days)
				.ResolveWith<Resolvers>(x => x.GetWeekDaysFortweleveWeekYearWeek(default!, default!))
				.UseDbContext<AppDbContext>()
				.Description("The list of Weekdays for the TweleveWeekYearWeek.");
		}

		private class Resolvers
		{
			public TweleveWeekYear GetTweleveWeekYearForTweleveWeekYearWeek([Parent] TweleveWeekYearWeek tweleveWeekYearWeek, [ScopedService] AppDbContext context)
			{
				return context.TweleveWeekYears.FirstOrDefault(x => x.Id == tweleveWeekYearWeek.Id);
			}

			public IQueryable<WeekDay> GetWeekDaysFortweleveWeekYearWeek([Parent] TweleveWeekYearWeek tweleveWeekYearWeek, [ScopedService] AppDbContext context)
			{
				return context.WeekDays.Where(x => x.TweleveWeekYearWeekId == tweleveWeekYearWeek.Id);
			}
		}
	}
}
