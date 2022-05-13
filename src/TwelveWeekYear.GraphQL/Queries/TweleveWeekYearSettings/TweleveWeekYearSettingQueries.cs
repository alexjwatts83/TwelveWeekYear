using HotChocolate;
using HotChocolate.Data;
using HotChocolate.Types;
using Microsoft.Extensions.Logging;
using System.Linq;
using TwelveWeekYear.Application.Interfaces;
using TwelveWeekYear.Domain.Models;

namespace TwelveWeekYear.GraphQL.Queries.TweleveWeekYearSettings
{
	[ExtendObjectType(OperationTypeNames.Query)]
	public class TweleveWeekYearSettingQueries : BaseGraphQLOperation
	{
		public TweleveWeekYearSettingQueries(ILogger<BaseGraphQLOperation> logger, IAppDbContext dbContext)
			: base(logger, dbContext)
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
