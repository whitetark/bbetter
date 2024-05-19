﻿using Dapper;
using database.Models;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Options;
using Microsoft.Identity.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Task = System.Threading.Tasks.Task;

namespace database.Repositories
{
    public class BHabitDateRepository(IOptions<DbConfig> dbConfig)
    {
        //get-by-id
        public async Task<BHabitDate> GetByHabitDateId(int habitDateId)
        {
            try
            {
                string sql = @"SELECT * FROM bbetterSchema.BHabitDate
                WHERE BHabitDateId = @habitDateId";
                using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
                {
                    var bhabit = await _dbConnection.QuerySingleAsync<BHabitDate>(sql, new { habitDateId });

                    if (bhabit == null)
                    {
                        return null;
                    }

                    return bhabit;
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to Get BHabit Dates", ex);
            }
        }

        //get-dates
        public async Task<List<BHabitDate>> GetByHabitId(int habitId)
        {
            try
            {
                string sql = @"SELECT * FROM bbetterSchema.BHabitDate
                WHERE BHabitId = @habitId";
                using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
                {
                    var bhabits = await _dbConnection.QueryAsync<BHabitDate>(sql, new { habitId });

                    if (!bhabits.Any())
                    {
                        return new List<BHabitDate>();
                    }

                    var result = bhabits.ToList();

                    return result;
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to Get BHabit Dates", ex);
            }
        }

        //get-by-month
        public async Task<List<BHabitDate>> GetByMonth(int habitId, int month, int year)
        {
            try
            {
                string sql = @"SELECT * FROM bbetterSchema.BHabitDate
                WHERE BHabitId = @habitId
                AND MONTH(DateOf) = @month
                AND YEAR(DateOf) = @year;";

                using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
                {
                    var ghabits = await _dbConnection.QueryAsync<BHabitDate>(sql, new { habitId, month, year });

                    if (!ghabits.Any())
                    {
                        return new List<BHabitDate>();
                    }

                    var result = ghabits.ToList();

                    return result;
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to Get BHabit Dates", ex);
            }
        }

        //get-recent
        public async Task<BHabitDate> GetRecent(int habitId) {
            try
            {
                string sql = @"SELECT TOP 1 * FROM bbetterSchema.BHabitDate
                WHERE BHabitId = @habitId
                ORDER BY DateOf DESC";

                using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
                {
                    var reflection = await _dbConnection.QuerySingleOrDefaultAsync<BHabitDate>(sql, new { habitId });

                    if (reflection == null)
                    {
                        return null;
                    }

                    return reflection;
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to Get Recent BHabitDate", ex);
            }

        }

        //create
        public async Task<bool> Add(BHabitDate bHabitDate)
        {
            try
            {
                string sql = @"SELECT * FROM bbetterSchema.BHabitDate
                WHERE (DateOf = @dateof)
                AND BHabitId = @bHabitId";

                using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
                {
                    var test = await _dbConnection.QueryAsync<BHabitDate>(sql, new { dateof = bHabitDate.DateOf, bHabitId = bHabitDate.BHabitId });

                    if (test.Any()) { return false; }

                    sql = @"INSERT INTO bbetterSchema.BHabitDate
                ([BHabitId],[DateOf]) 
                VALUES (@bHabitId, @dateOf)";

                    return await _dbConnection.ExecuteAsync(sql, new
                    {
                        bHabitId = bHabitDate.BHabitId,
                        dateOf = bHabitDate.DateOf,
                    }) > 0;
                }
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }


        //delete
        public async Task Delete(int bHabitDateId)
        {
            string sql = @"DELETE FROM bbetterSchema.BHabitDate
            WHERE BHabitDateId = @bHabitDateId";
            using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
            {
                if (await _dbConnection.ExecuteAsync(sql, new { bHabitDateId }) > 0) { return; }
            }

            throw new Exception("Failed to Delete BHabitDate");
        }

        //delete-by-bhabit
        public async Task DeleteMany(int bHabitId)
        {
            string sql = @"DELETE FROM bbetterSchema.BHabitDate
            WHERE BHabitId = @bHabitId";
            using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
            {
                if (await _dbConnection.ExecuteAsync(sql, new { bHabitId }) > 0) { return; }
            }
            throw new Exception("Failed to Delete BHabitDates");
        }
    }
}
