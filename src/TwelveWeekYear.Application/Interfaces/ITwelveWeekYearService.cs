using System.Threading.Tasks;

namespace TwelveWeekYear.Application.Interfaces
{
	public interface ITwelveWeekYearService
	{
		public Task<Domain.Models.TweleveWeekYear> GetData();
	}
}
