using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using TwelveWeekYear.Application.Interfaces;
using TwelveWeekYear.Domain.Models;
using TwelveWeekYear.Infrastructure.Identity;
using TwelveWeekYear.Infrastructure.Persistence.Interceptors;

namespace TwelveWeekYear.Infrastructure.Persistence
{
	public class AppDbContext : ApiAuthorizationDbContext<ApplicationUser>, IAppDbContext
	{
		private readonly AuditEntitiesSaveChangesInterceptor _auditEntitiesSaveChangesInterceptor;
		public AppDbContext(DbContextOptions options,
			IOptions<OperationalStoreOptions> operationalStoreOptions,
			ICurrentUserService currentUserService) : base(options, operationalStoreOptions)
		{
			this._auditEntitiesSaveChangesInterceptor = new AuditEntitiesSaveChangesInterceptor(currentUserService);
		}
		public DbSet<Goal> Goals { get; set; }
		public DbSet<GoalType> GoalTypes { get; set; }
		public DbSet<Interval> Intervals { get; set; }
		public DbSet<Subtask> Subtasks { get; set; }
		public DbSet<Task> Tasks { get; set; }
		public DbSet<TweleveWeekYear> TweleveWeekYears { get; set; }
		public DbSet<TweleveWeekYearWeek> TweleveWeekYearWeeks { get; set; }
		public DbSet<WeekDay> WeekDays { get; set; }
		public DbSet<WeekDayTasksResult> WeekDayTasksResults { get; set; }
		public DbSet<WeekDaySubtasksResult> WeekDaySubtasksResults { get; set; }
		public DbSet<TweleveWeekYearSetting> TweleveWeekYearSettings { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);
			SetGoalsHasManyTasks(modelBuilder);
			SetTaskHasManySubtasks(modelBuilder);
			SetTweleveWeekYearHasManyGoals(modelBuilder);
			SetTweleveWeekYearHasManyTweleveWeekYearWeeks(modelBuilder);
			SetTweleveWeekYearWeekHasManyWeekdays(modelBuilder);
		}

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			optionsBuilder
				.EnableDetailedErrors()
				.LogTo(Console.WriteLine);

			optionsBuilder.AddInterceptors(_auditEntitiesSaveChangesInterceptor);

			base.OnConfiguring(optionsBuilder);
		}

		private static void SetTweleveWeekYearWeekHasManyWeekdays(ModelBuilder modelBuilder)
		{
			// TweleveWeekYearWeek has many WeekDay
			modelBuilder
				.Entity<TweleveWeekYearWeek>()
				.HasMany(x => x.Days)
				.WithOne(x => x.TweleveWeekYearWeek!)
				.HasForeignKey(x => x.TweleveWeekYearWeekId);

			// WeekDay has one TweleveWeekYearWeek
			modelBuilder
				.Entity<WeekDay>()
				.HasOne(x => x.TweleveWeekYearWeek)
				.WithMany(x => x.Days)
				.HasForeignKey(x => x.TweleveWeekYearWeekId);
		}

		private static void SetTweleveWeekYearHasManyTweleveWeekYearWeeks(ModelBuilder modelBuilder)
		{
			// TweleveWeekYear has many TweleveWeekYearWeek
			modelBuilder
				.Entity<TweleveWeekYear>()
				.HasMany(x => x.Weeks)
				.WithOne(x => x.TweleveWeekYear!)
				.HasForeignKey(x => x.TweleveWeekYearId);

			// TweleveWeekYearWeek has one TweleveWeekYear
			modelBuilder
				.Entity<TweleveWeekYearWeek>()
				.HasOne(x => x.TweleveWeekYear)
				.WithMany(x => x.Weeks)
				.HasForeignKey(x => x.TweleveWeekYearId);
		}

		private static void SetTweleveWeekYearHasManyGoals(ModelBuilder modelBuilder)
		{
			// TweleveWeekYear has many Goals
			modelBuilder
				.Entity<TweleveWeekYear>()
				.HasMany(x => x.Goals)
				.WithOne(x => x.TweleveWeekYear!)
				.HasForeignKey(x => x.TweleveWeekYearId);

			// Goal has one TweleveWeekYear
			modelBuilder
				.Entity<Goal>()
				.HasOne(x => x.TweleveWeekYear)
				.WithMany(x => x.Goals)
				.HasForeignKey(x => x.TweleveWeekYearId);
		}

		private static void SetTaskHasManySubtasks(ModelBuilder modelBuilder)
		{
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

		private static void SetGoalsHasManyTasks(ModelBuilder modelBuilder)
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
		}
	}
}
