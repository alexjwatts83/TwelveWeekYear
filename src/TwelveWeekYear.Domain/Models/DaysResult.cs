using System;
using System.Collections.Generic;

namespace TwelveWeekYear.Domain.Models
{
	public class DaysResult
	{
		public int Id { get; set; }
		public DateTime Date { get; set; }
		public Goal Goal { get; set; }
		public string Notes { get; set; }
		public bool Completed { get; set; }
	}
}
