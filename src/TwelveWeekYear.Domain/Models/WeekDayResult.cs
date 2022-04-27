using System;
using System.ComponentModel.DataAnnotations;

namespace TwelveWeekYear.Domain.Models
{
	public class WeekDayResult
	{
		[Key]
		public int Id { get; set; }
		[Required]
		public int WeekNumber { get; set; }
		[Required]
		public DateTime Date { get; set; }
		[Required]
		public string Name { get; set; }
		public int GoalId { get; set; }
		public Goal Goal { get; set; }
		public int TaskId { get; set; }
		public Task Task { get; set; }
		public int SubtaskId { get; set; }
		public Subtask Subtask { get; set; }
		[Required]
		public bool Completed { get; set; }
	}
}
