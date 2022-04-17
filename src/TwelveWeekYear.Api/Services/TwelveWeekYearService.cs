using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TwelveWeekYear.Application.Interfaces;
using TwelveWeekYear.Domain.Models;

namespace TwelveWeekYear.Api.Services
{
	public class TwelveWeekYearService : ITwelveWeekYearService
	{
		private readonly IGoalsService _goalsService;

		public TwelveWeekYearService(IGoalsService goalsService)
		{
			_goalsService = goalsService;
		}
		Task<TweleveWeekYear> ITwelveWeekYearService.GetData()
		{
			throw new NotImplementedException();
		}
	}
}
