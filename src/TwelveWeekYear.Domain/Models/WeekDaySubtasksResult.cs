using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TwelveWeekYear.Domain.Models
{
	public class WeekDaySubtasksResult
	{
		[Key]
		public int Id { get; set; }
		[Required]
		public int WeekNumber { get; set; }
		[Required]
		public DateTime Date { get; set; }
		[Required]
		public string Name { get; set; }
		[NotMapped]
		public Goal Goal { get; set; }
		public int SubtaskId { get; set; }
		public Subtask Subtask { get; set; }
		[Required]
		public bool Completed { get; set; }
	}
}
