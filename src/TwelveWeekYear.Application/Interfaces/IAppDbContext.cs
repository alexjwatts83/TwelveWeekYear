using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;
using TwelveWeekYear.Domain.Models;

namespace TwelveWeekYear.Application.Interfaces
{
	public interface IAppDbContext
	{
		public DbSet<Goal> Goals { get; set; }
		public DbSet<GoalType> GoalTypes { get; set; }
		public DbSet<Interval> Intervals { get; set; }
		public DbSet<Subtask> Subtasks { get; set; }
		public DbSet<Domain.Models.Task> Tasks { get; set; }
		public DbSet<TweleveWeekYear> TweleveWeekYears { get; set; }
		public DbSet<TweleveWeekYearWeek> TweleveWeekYearWeeks { get; set; }
		public DbSet<WeekDay> WeekDays { get; set; }
		public DbSet<WeekDayTasksResult> WeekDayTasksResults { get; set; }
		public DbSet<WeekDaySubtasksResult> WeekDaySubtasksResults { get; set; }
		public DbSet<TweleveWeekYearSetting> TweleveWeekYearSettings { get; set; }

		Task<int> SaveChangesAsync(CancellationToken cancellationToken);
		ValueTask DisposeAsync();
		void Dispose();
	}
}
