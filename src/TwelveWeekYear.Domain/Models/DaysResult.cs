using System;
using System.ComponentModel.DataAnnotations;

namespace TwelveWeekYear.Domain.Models
{
	public class DaysResult
	{
		[Key]
		public int Id { get; set; }
		public DateTime Date { get; set; }
		[Required]
		public int GoalId { get; set; }
		public Goal Goal { get; set; }
		public string Notes { get; set; }
		[Required]
		public bool Completed { get; set; }
	}
}
