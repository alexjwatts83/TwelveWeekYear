using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TwelveWeekYear.Domain.Models
{
	public class WeekDayTasksResult
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
		public int TaskId { get; set; }
		public Task Task { get; set; }
		[Required]
		public bool Completed { get; set; }
	}
}
