using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TwelveWeekYear.Domain.Models
{
	public class TweleveWeekYear
	{
		[Key]
		public int Id { get; set; }
		[Required]
		public DateTime StartDate { get; set; }
		[Required]
		public DateTime EndDate { get; set; }
		[Required]
		public string Name { get; set; }
		[Required]
		public string Description { get; set; }
		public ICollection<Goal> Goals { get; set; } = new List<Goal>();
		public ICollection<TweleveWeekYearWeek> Weeks { get; set; } = new List<TweleveWeekYearWeek>();
	}
}
