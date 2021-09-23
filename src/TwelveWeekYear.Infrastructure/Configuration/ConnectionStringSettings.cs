﻿namespace TwelveWeekYear.Infrastructure.Configuration
{
	public class ConnectionStringSettings
	{
		public const string Section = "ConnectionStrings";
		public string Database { get; set; }
		public string Redis { get; set; }
	}
}
