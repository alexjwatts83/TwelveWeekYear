using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TwelveWeekYear.Application.Interfaces;
using TwelveWeekYear.Domain.Models;

namespace TwelveWeekYear.Api.Services
{
	public class GoalsService : IGoalsService
	{
		public void AddGoal(string description, GoalType goalType, IEnumerable<Domain.Models.Task> task)
		{
			throw new NotImplementedException();
		}

		public Task<IEnumerable<Goal>> GetGoals(GoalType type)
		{
			throw new NotImplementedException();
		}

		public void SetGoals(IEnumerable<Goal> goals)
		{
			throw new NotImplementedException();
		}
	}
}
