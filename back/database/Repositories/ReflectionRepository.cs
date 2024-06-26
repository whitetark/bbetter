﻿using Dapper;
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
    public class ReflectionRepository(IOptions<DbConfig> dbConfig)
    {
        //get-reflection
        public async Task<Reflection> GetById(int reflectionid)
        {
            try
            {
                const string sql = @"SELECT * FROM bbetterSchema.Reflections
                WHERE ReflectionId = @reflectionid";
                using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
                {
                    var refl = await _dbConnection.QuerySingleAsync<Reflection>(sql, new { reflectionid }).ConfigureAwait(false);
                    return refl;
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentException("Failed to Get Reflection", ex);
            }
        }

        //get-reflections
        public async Task<List<Reflection>> GetByAccount(int accountId)
        {
            try
            {
                const string sql = @"SELECT * FROM bbetterSchema.Reflections
                WHERE AccountId = @accountId";
                using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
                {
                    var refl = await _dbConnection.QueryAsync<Reflection>(sql, new { accountId }).ConfigureAwait(false);

                    if (!refl.Any())
                    {
                        return new List<Reflection>();
                    }

                    var result = refl.ToList();

                    return result;
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentException("Failed to Get Reflection", ex);
            }
        }

        //get-last-28-days
        public async Task<List<Reflection>> GetLastMonth(int accountId)
        {
            try
            {
                const string sql = @"SET DATEFIRST 1;
                DECLARE @today DATE = GETDATE();
                DECLARE @startOfDate DATE = DATEADD(WEEK, -4, DATEADD(DAY, 1 - (DATEPART(WEEKDAY, @today) + @@DATEFIRST - 2) % 7, @today));
                DECLARE @endOfDate DATE = DATEADD(DAY, -1, DATEADD(DAY, 1 - (DATEPART(WEEKDAY, @today) + @@DATEFIRST - 2) % 7, @today));
                SELECT * FROM bbetterSchema.Reflections
                WHERE AccountId = @accountId
                AND DateOf >= @startOfDate 
                AND DateOf < @endOfDate
                ORDER BY DateOf;";

                using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
                {
                    var ghabits = await _dbConnection.QueryAsync<Reflection>(sql, new { accountId}).ConfigureAwait(false);

                    if (!ghabits.Any())
                    {
                        return [];
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
        public async Task<List<Reflection>> GetByMonth(int accountId, int month, int year)
        {
            try
            {
                const string sql = @"SELECT * FROM bbetterSchema.Reflections
                WHERE AccountId = @accountId
                AND MONTH(DateOf) = @month
                AND YEAR(DateOf) = @year;";

                using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
                {
                    var ghabits = await _dbConnection.QueryAsync<Reflection>(sql, new { accountId, month, year }).ConfigureAwait(false);

                    if (!ghabits.Any())
                    {
                        return [];
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

        //get-recent
        public async Task<Reflection> GetRecent(int accountId)
        {
            try
            {
                const string sql = @"SELECT TOP 1 * FROM bbetterSchema.Reflections
                WHERE AccountId = @accountId
                ORDER BY DateOf DESC";

                using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
                {
                    var reflection = await _dbConnection.QuerySingleOrDefaultAsync<Reflection>(sql, new { accountId }).ConfigureAwait(false);

                    if(reflection == null)
                    {
                        return null;
                    }

                    return reflection;
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentException("Failed to Get Recent Reflection", ex);
            }
        }

        //check-by-today
        public async Task<bool> CheckToday(int accountId)
        {
            try
            {
                const string sql = @"SELECT COUNT(*) AS NumReflections 
                FROM bbetterSchema.Reflections
                WHERE AccountId = @accountId
                AND CONVERT(DATE, DateOf) = CONVERT(DATE, GETDATE());";
                using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
                {
                    var result = await _dbConnection.QuerySingleAsync<int>(sql, new { accountId }).ConfigureAwait(false);
                    return result != 0;
                }

            } catch (Exception ex)
            {
                throw new ArgumentException("Failed to Check Reflection", ex);
            }
        }

        //create
        public async Task<Reflection> Add(Reflection reflection)
        {
            try
            {
                const string sql = @"INSERT INTO bbetterSchema.Reflections
                ([AccountId],[DateOf],[Emotion],[Productivity],[ThreeWords],[UserGoal]) 
                OUTPUT INSERTED.*
                VALUES (@accountId, @dateOf, @emotion, @productivity, @threeWords, @userGoal)";

                using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
                {
                    return await _dbConnection.QuerySingleAsync<Reflection>(sql, new
                    {
                        accountId = reflection.AccountId,
                        dateOf = reflection.DateOf,
                        emotion = reflection.Emotion,
                        productivity = reflection.Productivity,
                        threeWords = reflection.ThreeWords,
                        userGoal = reflection.UserGoal,
                    }).ConfigureAwait(false);
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentException("Reflection added error: ", ex);
            }
        }

        //update
        public async Task Update(Reflection newReflection)
        {
            const string sql = @"UPDATE bbetterSchema.Reflections
            SET [Emotion] = @emotion, [Productivity] = @productivity, [ThreeWords] = @threeWords, [UserGoal] = @userGoal
            WHERE ReflectionId = @reflectionId";
            using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
            {
                if (await _dbConnection.ExecuteAsync(sql, new
                {
                    emotion = newReflection.Emotion,
                    productivity = newReflection.Productivity,
                    threeWords = newReflection.ThreeWords,
                    userGoal = newReflection.UserGoal,
                    reflectionId = newReflection.ReflectionId,
                }).ConfigureAwait(false) > 0) { return; }
            }

            throw new ArgumentException("Failed to Update Reflection");
        }

        //delete
        public async Task Delete(int reflectionId)
        {
            const string sql = @"DELETE FROM bbetterSchema.Reflections
            WHERE ReflectionId = @reflectionId";
            using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
            {
                if (await _dbConnection.ExecuteAsync(sql, new { reflectionId }).ConfigureAwait(false) > 0) { return; }
            }

            throw new ArgumentException("Failed to Delete Reflection");
        }

        //delete-by-account
        public async Task DeleteMany(int accountId)
        {
            const string sql = @"DELETE FROM bbetterSchema.Reflections
            WHERE AccountId = @accountId";
            using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
            {
                if (await _dbConnection.ExecuteAsync(sql, new { accountId }).ConfigureAwait(false) > 0) { return; }
            }

            throw new ArgumentException("Failed to Delete Reflections");
        }
    }
}
