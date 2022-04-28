using Microsoft.EntityFrameworkCore;
using TwelveWeekYear.Domain.Models;

namespace TwelveWeekYear.Infrastructure.Persistence
{
	public class AppDbContext : DbContext
	{
		public AppDbContext(DbContextOptions options) : base(options)
		{

		}

		public DbSet<DaysResult> DaysResults { get; set; }
		public DbSet<Goal> Goals { get; set; }
		public DbSet<GoalAction> GoalActions { get; set; }
		public DbSet<Interval> Intervals { get; set; }
		public DbSet<Subtask> Subtasks { get; set; }
		public DbSet<Domain.Models.Task> Tasks { get; set; }
		public DbSet<TweleveWeekYear> TweleveWeekYears { get; set; }
		public DbSet<TweleveWeekYearWeek> TweleveWeekYearWeeks { get; set; }
		public DbSet<WeekDay> WeekDays { get; set; }
		public DbSet<WeekDayResult> WeekDayResults { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{

		}
	}
}
