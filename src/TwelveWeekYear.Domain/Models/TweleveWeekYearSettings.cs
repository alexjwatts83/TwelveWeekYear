using System.ComponentModel.DataAnnotations;

namespace TwelveWeekYear.Domain.Models
{
	public class TweleveWeekYearSetting
	{
		[Key]
		public int Id { get; set; }
		public int WeeksCount { get; set; }
	}
}
