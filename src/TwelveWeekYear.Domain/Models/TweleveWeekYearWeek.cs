using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TwelveWeekYear.Domain.Models
{
	public class TweleveWeekYearWeek
	{
		[Key]
		public int Id { get; set; }
		[Required]
		public int WeekNumber { get; set; }
		[Required]
		public DateTime Date { get; set; }

		[Required]
		public int TweleveWeekYearId { get; set; }
		public TweleveWeekYear TweleveWeekYear { get; set; }

		public ICollection<WeekDay> Days { get; set; } = new List<WeekDay>();
	}
}
