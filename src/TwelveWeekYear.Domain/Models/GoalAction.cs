using System;
using System.ComponentModel.DataAnnotations;

namespace TwelveWeekYear.Domain.Models
{
	public class GoalAction
	{
		[Key]
		public int Id { get; set; }
		[Required]
		public int GoalId { get; set; }
		public Goal Goal { get; set; }
		[Required]
		public DateTime Date { get; set; }
		[Required]
		public string Description { get; set; }
	}
}
