using System;
using System.Collections.Generic;

namespace TwelveWeekYear.Domain.Models
{
	public class TweleveWeekYearWeek
	{
		public int Id { get; set; }
		public DateTime Date { get; set; }
		public IEnumerable<string> Notes { get; set; }
	}
}
