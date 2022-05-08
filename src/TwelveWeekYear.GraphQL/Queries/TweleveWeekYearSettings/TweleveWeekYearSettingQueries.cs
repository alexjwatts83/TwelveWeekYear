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
	public class TweleveWeekYearSettingQueries : BaseGraphQLOperation
	{
		public TweleveWeekYearSettingQueries(ILogger<BaseGraphQLOperation> logger, IDbContextFactory<AppDbContext> dbContextFactory)
			: base(logger, dbContextFactory)
		{
		}

		[GraphQLDescription("Gets the queryable GetTweleveWeekYearSetting.")]
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
