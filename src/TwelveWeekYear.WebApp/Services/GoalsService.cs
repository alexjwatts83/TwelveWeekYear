using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TwelveWeekYear.Application.Interfaces;
using TwelveWeekYear.Domain.Models;

namespace TwelveWeekYear.WebApp.Services
{
	public class GoalsService : IGoalsService
	{
		public void AddGoal(string description, GoalTypes goalType, IEnumerable<Domain.Models.Task> task)
		{
			throw new NotImplementedException();
		}

		public Task<IEnumerable<Goal>> GetGoals(GoalTypes type)
		{
			throw new NotImplementedException();
		}

		public void SetGoals(IEnumerable<Goal> goals)
		{
			throw new NotImplementedException();
		}
	}
}
