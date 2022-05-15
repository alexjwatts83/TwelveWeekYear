using HotChocolate.Types;
using HotChocolate.Types.Descriptors;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using TwelveWeekYear.Infrastructure.Persistence;

namespace TwelveWeekYear.GraphQL.Extensions
{
	public class UseMyWorldDbContextAttribute : ObjectFieldDescriptorAttribute
	{
		public override void OnConfigure(IDescriptorContext context,
		IObjectFieldDescriptor descriptor, MemberInfo member)
		{
			descriptor.UseDbContext<AppDbContext>();
		}
	}
}
