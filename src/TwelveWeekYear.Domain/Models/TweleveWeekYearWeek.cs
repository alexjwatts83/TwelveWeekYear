using System;
using System.Collections.Generic;

namespace TwelveWeekYear.Domain.Models
{
	public class TweleveWeekYearWeek
	{
		public int Id { get; set; }
		public int WeekNumber { get; set; }
		public DateTime Date { get; set; }
		public IEnumerable<WeekDay> Days { get; set; }
	}
}
