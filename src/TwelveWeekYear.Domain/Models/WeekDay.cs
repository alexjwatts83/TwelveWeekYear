﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TwelveWeekYear.Domain.Models
{
	public class WeekDay
	{
		[Key]
		public int Id { get; set; }
		[Required]
		public DateTime Date { get; set; }
		[Required]
		public string Description { get; set; }
	}
}
