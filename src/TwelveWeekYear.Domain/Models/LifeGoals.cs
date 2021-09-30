using System;
using System.Collections.Generic;

namespace TwelveWeekYear.Domain.Models
{
	public class LifeGoals
	{
		public int Id { get; set; }
		public DateTime Date { get; set; }
		public IEnumerable<Goal> Goals { get; set; }
	}
}
