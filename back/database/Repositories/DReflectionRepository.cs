using bbetter.Database.Models;
using Dapper;
using database;
using database.Models;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace bbetter.Database.Repositories
{
    public class DReflectionRepository(IOptions<DbConfig> dbConfig)
    {
        public async Task<DReflection> GetByDate(DateTime date, int accountId)
        {
            string sql = @"SELECT TOP 1 FROM bbetterSchema.DReflections
            WHERE AccountId = @accountId
            AND DAY(DateOf) = @day";

            using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
            {
                var ghabit = await _dbConnection.QuerySingleAsync<DReflection>(sql, new { accountId, day = date.Day});
                return ghabit;
            }

            throw new Exception("Failed to Get BHabit Dates");
        }
        public async Task<List<DReflection>> GetByMonth(int accountId, int month, int year)
        {
            string sql = @"SELECT * FROM bbetterSchema.DReflections
            WHERE AccountId = @accountId
            AND MONTH(DateOf) = @month
            AND YEAR(DateOf) = @year;";

            using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
            {
                var ghabits = await _dbConnection.QueryAsync<DReflection>(sql, new { accountId, month, year });

                if (!ghabits.Any())
                {
                    return new List<DReflection>();
                }

                var result = ghabits.ToList();

                return result;
            }

            throw new Exception("Failed to Get BHabit Dates");
        }
        public async Task<DReflection> Create(DReflection dReflection)
        {
            string sql = @"INSERT INTO bbetterSchema.DReflections
                ([AccountId],[DateOf],[Recap],[Times]) 
                OUTPUT INSERTED.*
                VALUES (@accountId, @dateOf, @recap, @times)";

            using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
            {
                return await _dbConnection.QuerySingleAsync<DReflection>(sql, new
                {
                    accountId = dReflection.AccountId,
                    dateOf = dReflection.DateOf,
                    recap = dReflection.Recap,
                    times = dReflection.Times,
                });
            }

            throw new Exception("Failed to Create DReflect");
        }
        public async void Delete(int dReflectId)
        {
            string sql = @"DELETE FROM bbetterSchema.DReflections
            WHERE DReflectionId = @dReflectId";
            using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
            {
                if (await _dbConnection.ExecuteAsync(sql, new { dReflectId }) > 0) { return; }
            }

            throw new Exception("Failed to Delete DReflect");
        }

        public async void DeleteMany(int accountId)
        {
            string sql = @"DELETE FROM bbetterSchema.DReflections
            WHERE AccountId = @accountId";
            using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
            {
                if (await _dbConnection.ExecuteAsync(sql, new { accountId }) > 0) { return; }
            }

            throw new Exception("Failed to Delete DReflects");
        }
    }
}
