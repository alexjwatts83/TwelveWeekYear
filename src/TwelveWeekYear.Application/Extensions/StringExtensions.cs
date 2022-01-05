using System.Text.Json;

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
