using System;

namespace TwelveWeekYear.Domain.Models
{
	public class GoalAction
	{
		public Goal Goal { get; set; }
		public DateTime Date { get; set; }
		public string Description { get; set; }
	}
}
