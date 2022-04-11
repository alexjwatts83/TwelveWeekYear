using System.Collections.Generic;

namespace TwelveWeekYear.Domain.Models
{
	public class Task
	{
		public int Id { get; set; }
		public string Description { get; set; }
		public List<Subtask> Subtasks { get; set; }
	}
}
