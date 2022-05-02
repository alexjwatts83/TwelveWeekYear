using System.Linq;
using TwelveWeekYear.Domain.Models;
using TwelveWeekYear.Infrastructure.Persistence;

namespace TwelveWeekYear.Infrastructure
{
	public static class AppDbContextSeeder
	{
		public static void Seed(AppDbContext context)
		{
			if (context.GoalTypes.Any())
			{
				return;
			}

			var list = new GoalType[]
			{
				new GoalType
				{
					Name = "None"
				},
				new GoalType
				{
					Name = "Three To Five Year"
				},
				new GoalType
				{
					Name = "This Year"
				},
				new GoalType
				{
					Name = "Twelve Week Year"
				}
			};

			context.GoalTypes.AddRange(list);
			context.SaveChanges();
		}
	}
}
