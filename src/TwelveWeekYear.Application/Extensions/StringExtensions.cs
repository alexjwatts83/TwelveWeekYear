using Microsoft.Extensions.Caching.Distributed;
using System;
using System.Text.Json;
using System.Threading.Tasks;

namespace TwelveWeekYear.Application.Extensions
{
	public static class StringExtensions
	{
		public static string ToJsonSystemText(this object obj)
		{
			return JsonSerializer.Serialize(obj, new JsonSerializerOptions
			{
				WriteIndented = true
			});
		}
	}
}
