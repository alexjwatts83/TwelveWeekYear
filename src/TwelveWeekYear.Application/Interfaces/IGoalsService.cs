using System.Collections.Generic;
using System.Threading.Tasks;
using TwelveWeekYear.Domain.Models;

namespace TwelveWeekYear.Application.Interfaces
{
	public interface IGoalsService
	{
		public Task<IEnumerable<Goal>> GetGoals(GoalType type);
		public void SetGoals(IEnumerable<Goal> goals);
		public void AddGoal(string description, GoalType goalType, IEnumerable<Domain.Models.Task> task);
	}
}
