using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TwelveWeekYear.Domain.Models
{
	public class Task
	{
		[Key]
		public int Id { get; set; }
		[Required]
		public string Description { get; set; }

		public int GoalId { get; set; }
		public Goal Goal { get; set; }

		public ICollection<Subtask> Subtasks { get; set; } = new List<Subtask>();
	}
}
