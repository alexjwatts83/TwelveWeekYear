using System.ComponentModel.DataAnnotations;

namespace TwelveWeekYear.Domain.Models
{
	public class Subtask
	{
		[Key]
		public int Id { get; set; }
		[Required]
		public string Description { get; set; }

		[Required]
		public int TaskId { get; set; }
		public Task Task { get; set; }
	}
}
