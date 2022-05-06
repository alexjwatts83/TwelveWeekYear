using HotChocolate;
using HotChocolate.Types;
using System.Linq;
using TwelveWeekYear.Domain.Models;
using TwelveWeekYear.Infrastructure.Persistence;

namespace TwelveWeekYear.GraphQL.Queries.TweleveWeekYears
{
	public class TweleveWeekYearType : ObjectTypeExtension<TweleveWeekYear>
	{
		protected override void Configure(IObjectTypeDescriptor<TweleveWeekYear> descriptor)
		{
			descriptor.Description("Twleve Week Years");

			descriptor
				.Field(x => x.Id)
				.Description("Id of the Tweleve Week Year");

			descriptor
				.Field(x => x.Name)
				.Description("Name of the Tweleve Week Year");

			descriptor
				.Field(x => x.StartDate)
				.Description("Start Date of the Tweleve Week Year");
			descriptor
				.Field(x => x.EndDate)
				.Description("End Date of the Tweleve Week Year");

			descriptor
				.Field(x => x.Description)
				.Description("Brief Description of the Tweleve Week Year");

			descriptor
				.Field(x => x.Goals)
				.ResolveWith<Resolvers>(x => x.GetGoalsFortweleveWeekYear(default!, default!))
				.UseDbContext<AppDbContext>()
				.Description("The Goals for the TweleveWeekYear.");

			descriptor
				.Field(x => x.Weeks).Ignore();
		}

		private class Resolvers
		{
			public IQueryable<Goal> GetGoalsFortweleveWeekYear([Parent] TweleveWeekYear tweleveWeekYear, [ScopedService] AppDbContext context)
			{
				return context.Goals.Where(x => x.TweleveWeekYearId == tweleveWeekYear.Id);
			}
		}
	}
}
