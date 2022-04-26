using System;
using System.ComponentModel.DataAnnotations;

namespace TwelveWeekYear.Domain.Models
{
	public class Interval
	{
		[Key]
		public int Id { get; set; }
		[Required]
		public DateTime DateStart { get; set; }
		[Required]
		public DateTime DateEnd { get; set; }
	}
}
