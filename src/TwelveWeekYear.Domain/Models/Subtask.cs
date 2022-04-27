using System.ComponentModel.DataAnnotations;

namespace TwelveWeekYear.Domain.Models
{
	public class Subtask
	{
		[Key]
		public int Id { get; set; }
		[Required]
		public string Description { get; set; }
	}
}
