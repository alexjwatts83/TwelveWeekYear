using System.Linq;
using TwelveWeekYear.Application.Interfaces;

namespace TwelveWeekYear.Api.Services
{
	public class CacheKeyCreator : ICacheKeyCreator
	{
		public string GetCacheKeyNameFromObject(string keyPrefix, object parameters = null)
		{
			if (parameters == null)
			{
				return keyPrefix;
			}
			// TODO: figure out this works with a datetime type
			var properties = parameters.GetType()
									   .GetProperties()
									   .Select(p => p.GetValue(parameters, null));

			return keyPrefix + string.Join("_", properties);
		}
	}
}
