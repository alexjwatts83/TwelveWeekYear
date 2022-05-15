using HotChocolate.Types;
using HotChocolate.Types.Descriptors;
using System.Reflection;
using TwelveWeekYear.Infrastructure.Persistence;

namespace TwelveWeekYear.GraphQL.Extensions
{
	public class UseAppDbContextAttribute : ObjectFieldDescriptorAttribute
	{
		public override void OnConfigure(IDescriptorContext context,
		IObjectFieldDescriptor descriptor, MemberInfo member)
		{
			descriptor.UseDbContext<AppDbContext>();
		}
	}
}
