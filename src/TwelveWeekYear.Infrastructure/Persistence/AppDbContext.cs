using Microsoft.EntityFrameworkCore;
using TwelveWeekYear.Domain.Models;

namespace TwelveWeekYear.Infrastructure.Persistence
{
	public class AppDbContext : DbContext
	{
		public AppDbContext(DbContextOptions options) : base(options)
		{

		}

		//public DbSet<DaysResult> DaysResults { get; set; }
		public DbSet<Goal> Goals { get; set; }
		public DbSet<Interval> Intervals { get; set; }
		public DbSet<Subtask> Subtasks { get; set; }
		public DbSet<Task> Tasks { get; set; }
		//public DbSet<TweleveWeekYear> TweleveWeekYears { get; set; }
		//public DbSet<TweleveWeekYearWeek> TweleveWeekYearWeeks { get; set; }
		//public DbSet<WeekDay> WeekDays { get; set; }
		//public DbSet<WeekDayResult> WeekDayResults { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			// Goal has many Task
			modelBuilder
				.Entity<Goal>()
				.HasMany(x => x.Tasks)
				.WithOne(x => x.Goal!)
				.HasForeignKey(x => x.GoalId);

			// Task has one Goal
			modelBuilder
				.Entity<Task>()
				.HasOne(x => x.Goal)
				.WithMany(x => x.Tasks)
				.HasForeignKey(x => x.GoalId);

			// Task has many Subtask
			modelBuilder
				.Entity<Task>()
				.HasMany(x => x.Subtasks)
				.WithOne(x => x.Task!)
				.HasForeignKey(x => x.TaskId);

			// Subtask has one task
			modelBuilder
				.Entity<Subtask>()
				.HasOne(x => x.Task)
				.WithMany(x => x.Subtasks)
				.HasForeignKey(x => x.TaskId);
		}
	}
}
