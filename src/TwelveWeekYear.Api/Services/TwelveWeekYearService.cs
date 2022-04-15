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
		Task<TweleveWeekYear> ITwelveWeekYearService.GetData()
		{
			throw new NotImplementedException();
		}
	}
}
