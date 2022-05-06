using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TwelveWeekYear.Domain.Models
{
	public class Goal
	{
		[Key]
		public int Id { get; set; }
		[Required]
		public string Name { get; set; }
		[Required]
		public string Description { get; set; }

		[Required]
		public int GoalTypeId { get; set; }
		public GoalType GoalType { get; set; }

		public ICollection<Task> Tasks { get; set; } = new List<Task>();

		//[Required]
		public int TweleveWeekYearId { get; set; }

		public TweleveWeekYear TweleveWeekYear { get; set; }
	}
}
