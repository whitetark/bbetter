using Dapper;
using database.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Task = System.Threading.Tasks.Task;

namespace database.Repositories
{
    public class GHabitDateRepository(IOptions<DbConfig> dbConfig)
    {
        //get-date
        public async Task<GHabitDate> GetById(int gHabitDateId)
        {
            try
            {
                const string sql = @"SELECT * FROM bbetterSchema.GHabitDate
                WHERE GHabitDateId = @GHabitDateId";
                using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
                {
                    var ghabit = await _dbConnection.QuerySingleAsync<GHabitDate>(sql, new { gHabitDateId }).ConfigureAwait(false);
                    return ghabit;
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentException("Failed to Get GHabitDate", ex);
            }
        }

        //get-dates
        public async Task<List<GHabitDate>> GetByHabitId(int habitId)
        {
            try
            {
                const string sql = @"SELECT * FROM bbetterSchema.GHabitDate
                WHERE GHabitId = @habitId";
                using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
                {
                    var ghabits = await _dbConnection.QueryAsync<GHabitDate>(sql, new { habitId }).ConfigureAwait(false);

                    if (!ghabits.Any())
                    {
                        return new List<GHabitDate>();
                    }

                    var result = ghabits.ToList();

                    return result;
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentException("Failed to Get GHabit Dates", ex);
            }
        }

        //get-by-week
        public async Task<List<GHabitDate>> GetByWeek(int habitId)
        {
            try
            {
                const string sql = @"SET DATEFIRST 1
                SELECT * FROM bbetterSchema.GHabitDate
                WHERE GHabitId = @habitId
                WHERE DATEPART(week, DateOf) = DATEPART(week, GETDATE())
                AND DATEPART(year, DateOf) = DATEPART(year, GETDATE());";

                using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
                {
                    var ghabits = await _dbConnection.QueryAsync<GHabitDate>(sql, new { habitId }).ConfigureAwait(false);

                    if (!ghabits.Any())
                    {
                        return new List<GHabitDate>();
                    }

                    var result = ghabits.ToList();

                    return result;
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentException("Failed to Get GHabit Dates", ex);
            }
        }

        //get-by-month
        public async Task<List<GHabitDate>> GetByMonth(int habitId, int month, int year)
        {
            try
            {
                const string sql = @"SELECT * FROM bbetterSchema.GHabitDate
                WHERE GHabitId = @habitId
                AND MONTH(DateOf) = @month
                AND YEAR(DateOf) = @year;";

                using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
                {
                    var ghabits = await _dbConnection.QueryAsync<GHabitDate>(sql, new { habitId, month, year }).ConfigureAwait(false);

                    if (!ghabits.Any())
                    {
                        return new List<GHabitDate>();
                    }

                    var result = ghabits.ToList();

                    return result;
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentException("Failed to Get GHabit Dates", ex);
            }
        }

        //create
        public async Task<bool> Add(GHabitDate gHabitDate)
        {
            try
            {
                const string sql = @"SELECT * FROM bbetterSchema.GHabitDate
                WHERE DateOf = @dateof
                AND GHabitId = @gHabitId";

                using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
                {
                    var test = await _dbConnection.QueryAsync<GHabitDate>(sql, new { dateof = gHabitDate.DateOf, gHabitId = gHabitDate.GHabitId }).ConfigureAwait(false);

                    if (test.Count() > 0) { return false; }

                    const string sql2 = @"INSERT INTO bbetterSchema.GHabitDate
                    ([GHabitId],[DateOf]) 
                    VALUES (@gHabitId, @dateOf)";

                    return await _dbConnection.ExecuteAsync(sql2, new
                    {
                        gHabitId = gHabitDate.GHabitId,
                        dateOf = gHabitDate.DateOf,
                    }).ConfigureAwait(false) > 0;
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentException("err", ex);
            }
        }

        //delete
        public async Task Delete(int gHabitId, DateTime dateOf )
        {
            try
            {
                const string sql = @"DELETE FROM bbetterSchema.GHabitDate
                WHERE GHabitId = @gHabitId
                AND DateOf = @dateOf";
                using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
                {
                    if (await _dbConnection.ExecuteAsync(sql, new { gHabitId, dateOf }).ConfigureAwait(false) > 0) { return; }
                }
            } catch(Exception ex)
            {
                throw new ArgumentException("err", ex);
            }
            
        }

        //delete-by-ghabit
        public async Task DeleteMany(int gHabitId)
        {
            const string sql = @"DELETE FROM bbetterSchema.GHabitDate
            WHERE GHabitId = @gHabitId";
            using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
            {
                if (await _dbConnection.ExecuteAsync(sql, new { gHabitId }).ConfigureAwait(false) > 0) { return; }
            }

            throw new ArgumentException("Failed to Delete GHabitDates");
        }
    }
}
