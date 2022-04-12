using System;
using System.Collections.Generic;

namespace TwelveWeekYear.Domain.Models
{
	public class WeekDayResult
	{
		public int Id { get; set; }
		public int WeekNumber { get; set; }
		public DateTime Date { get; set; }
		public string Name { get; set; }
		public Goal Goal { get; set; }
		public Task Task { get; set; }
		public Subtask Subtask { get; set; }
		public bool Completed { get; set; }
	}
}
