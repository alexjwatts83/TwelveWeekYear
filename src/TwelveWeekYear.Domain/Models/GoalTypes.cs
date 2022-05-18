using System.ComponentModel.DataAnnotations;

namespace TwelveWeekYear.Domain.Models
{
	public class GoalType : AuditableEntity
	{
		[Key]
		public int Id { get; set; }
		[Required]
		public string Name { get; set; }
	}
}
