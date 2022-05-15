using HotChocolate.Types;
using HotChocolate.Types.Descriptors;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using TwelveWeekYear.Infrastructure.Persistence;

namespace TwelveWeekYear.GraphQL.Extensions
{
	public static class ObjectFieldDescriptorExtensions
	{
		public static IObjectFieldDescriptor UseDbContext<TDbContext>(
		 this IObjectFieldDescriptor descriptor
		) where TDbContext : DbContext
		{
			return descriptor.UseScopedService<TDbContext>(
				create: s => s.GetRequiredService<IDbContextFactory<TDbContext>>().CreateDbContext(),
				disposeAsync: (s, c) => c.DisposeAsync()
			);
		}
	}
	public class UseMyWorldDbContextAttribute : ObjectFieldDescriptorAttribute
	{
		public override void OnConfigure(IDescriptorContext context,
		IObjectFieldDescriptor descriptor, MemberInfo member)
		{
			descriptor.UseDbContext<AppDbContext>();
		}
	}
}
