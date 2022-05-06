using HotChocolate;
using HotChocolate.Data;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Linq;
using TwelveWeekYear.Domain.Models;
using TwelveWeekYear.Infrastructure.Persistence;

namespace TwelveWeekYear.GraphQL.Queries.TweleveWeekYearSettings
{
	[ExtendObjectType(OperationTypeNames.Query)]
	public class TweleveWeekYearSettingQueries : BaseQueries
	{
		public TweleveWeekYearSettingQueries(ILogger<BaseQueries> logger, IDbContextFactory<AppDbContext> dbContextFactory)
			: base(logger, dbContextFactory)
		{
		}

		[GraphQLDescription("Gets the queryable platform.")]
		[UseFiltering]
		[UseSorting]
		public TweleveWeekYearSetting GetTweleveWeekYearSetting()
		{
			logger.LogInformation("Calling GetTweleveWeekYearSetting");

			var settings = dbContext.TweleveWeekYearSettings;

			return settings.FirstOrDefault();
		}
	}
}
