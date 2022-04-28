using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TwelveWeekYear.Domain.Models;

namespace TwelveWeekYear.Infrastructure.Persistence
{
	public class AppDbContext : DbContext
	{
		public AppDbContext(DbContextOptions options) : base(options)
		{

		}

		public DbSet<DaysResult> DaysResults { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{

		}
	}
}
