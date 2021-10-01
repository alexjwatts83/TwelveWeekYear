using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TwelveWeekYear.Domain.Models
{
	public class GoalAction
	{
		public Goal Goal { get; set; }
		public DateTime Date { get; set; }
		public string Description { get; set; }
	}
}
