using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Linq;
using TwelveWeekYear.Domain.Models;
using TwelveWeekYear.Infrastructure.Persistence;

namespace TwelveWeekYear.Infrastructure
{
	public class AppDbContextInitialiser
	{
		private readonly AppDbContext _context;
		private readonly ILogger<AppDbContextInitialiser> _logger;

		public AppDbContextInitialiser(AppDbContext context, ILogger<AppDbContextInitialiser> logger)
		{
			_context = context;
			_logger = logger;
		}

		public void Initialise()
		{
			if (_context.Database.IsSqlServer())
			{
				_context.Database.Migrate();
			}
			else
			{
				_context.Database.EnsureCreated();
			}
		}

		public void Seed()
		{
			SeedGoalTypes();
			SeedTweleveWeekYearSettings();
		}

		private void SeedTweleveWeekYearSettings()
		{
			if (_context.TweleveWeekYearSettings.Any())
			{
				_logger.LogInformation("Tweleve Week Year Settings already exists");
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
				_context.TweleveWeekYearSettings.AddRange(list);
				_context.SaveChanges();
				_logger.LogInformation("Tweleve Week Year Settings added to the database");
			}
		}

		private void SeedGoalTypes()
		{
			if (_context.GoalTypes.Any())
			{
				_logger.LogInformation("Goal Types already exists");
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

				_context.GoalTypes.AddRange(list);
				_context.SaveChanges();
				_logger.LogInformation("Goal Types added to the database");
			}
		}
	}
}
