using System;
using System.Collections.Generic;

namespace TwelveWeekYear.Domain.Models
{
	public class TweleveWeekYear
	{
		public int Id { get; set; }
		public DateTime Date { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public IEnumerable<Goal> Goals { get; set; }
		public IEnumerable<TweleveWeekYearWeek> Weeks { get; set; }
	}
}
