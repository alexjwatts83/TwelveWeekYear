using Microsoft.Extensions.Logging;
using System.Linq;
using TwelveWeekYear.Domain.Models;
using TwelveWeekYear.Infrastructure.Persistence;

namespace TwelveWeekYear.Infrastructure
{
	public static class AppDbContextSeeder
	{
		public static void Seed(AppDbContext context, ILogger logger)
		{
			SeedGoalTypes(context, logger);
			SeedTweleveWeekYearSettings(context, logger);
		}

		private static void SeedTweleveWeekYearSettings(AppDbContext context, ILogger logger)
		{
			if (context.TweleveWeekYearSettings.Any())
			{
				logger.LogInformation("Tweleve Week Year Settings already exists");
			}
			else
			{
				var list = new TweleveWeekYearSetting[]
				{
					new TweleveWeekYearSetting()
					{
						WeeksCount = 12
					}
				};
				context.TweleveWeekYearSettings.AddRange(list);
				context.SaveChanges();
				logger.LogInformation("Tweleve Week Year Settings added to the database");
			}
		}

		private static void SeedGoalTypes(AppDbContext context, ILogger logger)
		{
			if (context.GoalTypes.Any())
			{
				logger.LogInformation("Goal Types already exists");
			}
			else
			{
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
				logger.LogInformation("Goal Types added to the database");
			}
		}
	}
}
