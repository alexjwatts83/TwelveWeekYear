using System.ComponentModel.DataAnnotations;

namespace TwelveWeekYear.Domain.Models
{
	public class GoalType
	{
		[Key]
		public int Id { get; set; }
		[Required]
		public string Name { get; set; }


		//[Required]
		//public int TweleveWeekYearId { get; set; }

		//public TweleveWeekYear TweleveWeekYear { get; set; }
	}
	//public enum GoalTypes
	//{
	//	ThreeToFiveYear,
	//	ThisYear,
	//	TweleveWeekYear,
	//	None
	//}
}
