﻿using Dapper;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using TwelveWeekYear.Application.Extensions;
using TwelveWeekYear.Application.Interfaces;
using TwelveWeekYear.Infrastructure.Persistence.Configuration;

namespace TwelveWeekYear.Infrastructure.Persistence.Repositories
{
	public class BaseRepository : IBaseRepository
	{
		private readonly string _connectionString;
		private readonly IDistributedCache _distributedCache;

		public IDbConnection Connection => new SqlConnection(_connectionString);

		public BaseRepository(IOptions<ConnectionStringSettings> connectionStrings, IDistributedCache distributedCache)
		{
			_connectionString = connectionStrings.Value.Database;
			_distributedCache = distributedCache;
		}

		public async Task<int> ExectuteAsync(string storedProcedure, object parameters = null)
		{
			using (var connection = Connection)
			{
				return await connection.ExecuteAsync(storedProcedure, parameters, commandType: CommandType.StoredProcedure);
			}
		}

		public async Task<IEnumerable<T>> GetCachedDataAsync<T>(string storedProcedure, object parameters = null, int cacheDuration = 60) where T : class
		{
			string key = GetCacheKeyNameFromObject(storedProcedure, parameters);

			return await _distributedCache.GetOrCreateAsync(
				key,
				async () => await GetDataAsync<T>(storedProcedure, parameters),
				TimeSpan.FromSeconds(cacheDuration));
		}

		public async Task<IEnumerable<T>> GetDataAsync<T>(string storedProcedure, object parameters = null) where T : class
		{
			using (var connection = Connection)
			{
				return await connection.QueryAsync<T>(storedProcedure,
													  parameters,
													  commandType: CommandType.StoredProcedure)
										.ConfigureAwait(false);
			}
		}

		public async Task<T> GetSingleAsync<T>(string storedProcedure, object parameters = null) where T : class
		{
			using (var connection = Connection)
			{
				return await connection.QuerySingleOrDefaultAsync<T>(storedProcedure,
													  parameters,
													  commandType: CommandType.StoredProcedure)
										.ConfigureAwait(false);
			}
		}

		private string GetCacheKeyNameFromObject(string keyPrefix, object parameters = null)
		{
			if (parameters == null)
			{
				return keyPrefix;
			}
			// TODO: figure out this works with a datetime type
			var properties = parameters.GetType()
									   .GetProperties()
									   .Select(p => p.GetValue(parameters, null));

			return keyPrefix + string.Join("_", properties);
		}

		public int Exectute(string storedProcedure, object parameters = null)
		{
			using (var connection = Connection)
			{
				return connection.Execute(storedProcedure, parameters, commandType: CommandType.StoredProcedure);
			}
		}

		public IEnumerable<T> GetData<T>(string storedProcedure, object parameters = null) where T : class
		{
			using (var connection = Connection)
			{
				return connection.Query<T>(storedProcedure,
													  parameters,
													  commandType: CommandType.StoredProcedure);
			}
		}

		public T GetSingle<T>(string storedProcedure, object parameters = null) where T : class
		{
			using (var connection = Connection)
			{
				return connection.QuerySingle<T>(storedProcedure,
													  parameters,
													  commandType: CommandType.StoredProcedure);
			}
		}

		public IEnumerable<T> GetCachedData<T>(string storedProcedure, object parameters = null, int cacheDuration = 60) where T : class
		{
			string key = GetCacheKeyNameFromObject(storedProcedure, parameters);

			return _distributedCache.GetOrCreate(
				key,
				() => GetData<T>(storedProcedure, parameters),
				TimeSpan.FromSeconds(cacheDuration));
		}

		public async Task<T> GetCachedSingleAsync<T>(string storedProcedure, object parameters = null, int cacheDuration = 60) where T : class
		{
			string key = GetCacheKeyNameFromObject(storedProcedure, parameters);

			return await _distributedCache.GetOrCreateAsync(
				key,
				async () => await GetSingleAsync<T>(storedProcedure, parameters),
				TimeSpan.FromSeconds(cacheDuration)).ConfigureAwait(false);
		}

		public T GetCachedSingle<T>(string storedProcedure, object parameters = null, int cacheDuration = 60) where T : class
		{
			string key = GetCacheKeyNameFromObject(storedProcedure, parameters);

			return _distributedCache.GetOrCreate(
				key,
				() => GetSingle<T>(storedProcedure, parameters),
				TimeSpan.FromSeconds(cacheDuration));
		}

		public async Task<IEnumerable<T>> QueryAsync<T>(string sql, object parameters = null) where T : class
		{
			using (var connection = Connection)
			{
				return await connection.QueryAsync<T>(sql, parameters, commandType: CommandType.Text);
			}
		}

		public async Task<T> QuerySingleOrDefaultAsync<T>(string sql, object parameters = null) where T : class
		{
			using (var connection = Connection)
			{
				return await connection.QuerySingleOrDefaultAsync<T>(sql, parameters, commandType: CommandType.Text);
			}
		}

		public IEnumerable<T> Query<T>(string sql, object parameters = null) where T : class
		{
			using (var connection = Connection)
			{
				return connection.Query<T>(sql, parameters, commandType: CommandType.Text);
			}
		}

		public T QuerySingleOrDefault<T>(string sql, object parameters = null) where T : class
		{
			using (var connection = Connection)
			{
				return connection.QuerySingleOrDefault<T>(sql, parameters, commandType: CommandType.Text);
			}
		}

		public async Task<IEnumerable<T>> CachedQueryAsync<T>(string keyPrefix, string sql, object parameters = null, int cacheDuration = 60)
			where T : class
		{
			string key = GetCacheKeyNameFromObject(keyPrefix, parameters);

			return await _distributedCache.GetOrCreateAsync(
				key,
				async () => await QueryAsync<T>(sql, parameters),
				TimeSpan.FromSeconds(cacheDuration));
		}

		public async Task<T> CachedQuerySingleOrDefaultAsync<T>(string keyPrefix, string sql, object parameters = null, int cacheDuration = 60) where T : class
		{
			string key = GetCacheKeyNameFromObject(keyPrefix, parameters);

			return await _distributedCache.GetOrCreateAsync(
				key,
				async () => await QuerySingleOrDefaultAsync<T>(sql, parameters),
				TimeSpan.FromSeconds(cacheDuration));
		}

		public IEnumerable<T> CachedQuery<T>(string keyPrefix, string sql, object parameters = null, int cacheDuration = 60) where T : class
		{
			string key = GetCacheKeyNameFromObject(keyPrefix, parameters);

			return _distributedCache.GetOrCreate(
				key,
				() => Query<T>(sql, parameters),
				TimeSpan.FromSeconds(cacheDuration));
		}

		public T CachedQuerySingleOrDefault<T>(string keyPrefix, string sql, object parameters = null, int cacheDuration = 60) where T : class
		{
			string key = GetCacheKeyNameFromObject(keyPrefix, parameters);

			return _distributedCache.GetOrCreate(
				key,
				() => QuerySingleOrDefault<T>(sql, parameters),
				TimeSpan.FromSeconds(cacheDuration));
		}
	}
}
