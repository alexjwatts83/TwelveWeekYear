using TwelveWeekYear.Domain.Models;

namespace TwelveWeekYear.Api
{
	public class Query
	{
		public Goal GetGoal()
		{
			return new Goal()
			{
				Description = "New Goal",
				Name = "Goal 1",
				Id = 1
			};
		}
	}
}
