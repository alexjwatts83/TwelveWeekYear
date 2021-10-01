namespace TwelveWeekYear.Application.Interfaces
{
	public interface ICacheKeyCreator
	{
		string GetCacheKeyNameFromObject(string keyPrefix, object parameters = null);
	}
}
