using System.Threading.Tasks;
using TwelveWeekYear.Application.Models;

namespace TwelveWeekYear.Application.Interfaces
{
	public interface IIdentityService
	{
		Task<string> GetUserNameAsync(string userId);

		Task<(Result Result, string UserId)> CreateUserAsync(
			string userName,
			string password);

		Task<Result> DeleteUserAsync(string userId);
	}
}