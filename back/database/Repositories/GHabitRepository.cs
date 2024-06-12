using Dapper;
using database.Models;
using Microsoft.AspNetCore.Http;
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
    public class GHabitRepository(IOptions<DbConfig> dbConfig)
    {
        //get-task
        public async Task<GHabit> GetById(int gHabitId)
        {
            try
            {
                const string sql = @"SELECT * FROM bbetterSchema.GHabits
                WHERE GHabitId = @gHabitId";
                using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
                {
                    var ghabit = await _dbConnection.QuerySingleAsync<GHabit>(sql, new { gHabitId }).ConfigureAwait(false);
                    return ghabit;
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentException("Failed to Get GHabit", ex);
            }
        }
        public async Task<List<GHabitWithDates>> GetWDatesByAccount(int accountId, string type = "currentWeek")
        {
            try
            {
                string dateSql = "";
                switch (type)
                {
                    case "currentWeek":
                        dateSql = @"SET DATEFIRST 1;
                    DECLARE @today DATE = GETDATE();
                    DECLARE @startOfDate DATE = DATEADD(day, 1 - ((DATEPART(weekday, @today) + @@DATEFIRST - 2) % 7 + 1), @today);
                    DECLARE @endOfDate DATE = DATEADD(day, 7, @startOfDate);";
                        break;

                    case "last28Days":
                        dateSql = @"
                    DECLARE @today DATE = GETDATE();
                    DECLARE @startOfDate DATE = DATEADD(day, -27, @today);
                    DECLARE @endOfDate DATE = DATEADD(day, 1, @today);";
                        break;
                }

                const string sql = @"
                SELECT * FROM bbetterSchema.GHabits
                WHERE AccountId = @accountId;
                SELECT GHD.GHabitDateId, GHD.DateOf, GHD.GHabitId
                FROM bbetterSchema.GHabits GH
                JOIN bbetterSchema.GHabitDate GHD ON GH.GHabitId = GHD.GHabitId
                WHERE GH.AccountId = @accountId 
                AND GHD.DateOf >= @startOfDate 
                AND GHD.DateOf < @endOfDate;";

                dateSql += sql;

                using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
                {
                    await _dbConnection.OpenAsync();
                    var results = await _dbConnection.QueryMultipleAsync(dateSql, new { accountId }).ConfigureAwait(false);
                    var ghabits = results.ReadAsync<GHabit>().Result.ToList();
                    var ghabitDates = results.ReadAsync<GHabitWeekResult>().Result.ToList();

                    List<GHabitWithDates> habitWithDates = ghabits.GroupJoin(
                            ghabitDates,
                            gHabit => gHabit.GHabitId.ToString(),
                            gHabitDate => gHabitDate.GHabitId,
                            (gHabit, gHabitDateResultsGroup) =>
                                new GHabitWithDates
                                {
                                    GHabitId = gHabit.GHabitId.ToString(),
                                    AccountId = gHabit.AccountId,
                                    Content = gHabit.Content,
                                    priorityOf = gHabit.priorityOf,
                                    GHabitDates = gHabitDateResultsGroup.ToList()
                                })
                        .ToList();

                    return habitWithDates;
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentException("Failed to Get GHabit", ex);
            }
        }

        //get-tasks
        public async Task<List<GHabit>> GetByAccount(int accountId)
        {
            try
            {
                const string sql = @"SELECT * FROM bbetterSchema.GHabits
                WHERE AccountId = @accountId";
                using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
                {
                    var ghabits = await _dbConnection.QueryAsync<GHabit>(sql, new { accountId }).ConfigureAwait(false);

                    if (!ghabits.Any())
                    {
                        return new List<GHabit>();
                    }

                    var result = ghabits.ToList();

                    return result;
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentException("Failed to Get GHabit", ex);
            }
        }

        //create
        public async Task<GHabit> Add(GHabit gHabit)
        {
            try
            {
                using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
                {
                    const string sql = @"INSERT INTO bbetterSchema.GHabits
                ([AccountId],[Content],[priorityOf]) 
                OUTPUT INSERTED.*
                VALUES (@accountId, @content, @priorityOf)";

                    return await _dbConnection.QuerySingleAsync<GHabit>(sql, new
                    {
                        accountId = gHabit.AccountId,
                        content = gHabit.Content,
                        gHabit.priorityOf,
                    }).ConfigureAwait(false);
                }
            }
            catch (Exception)
            {
                throw new ArgumentException("Failed to Add GHabit");
            }
        }

        //update
        public async Task Update(GHabit newGHabit)
        {
            const string sql = @"UPDATE bbetterSchema.GHabits 
            SET [Content] = @content, [priorityOf] = @priorityOf
            WHERE GHabitId = @gHabitId";
            using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
            {
                if (await _dbConnection.ExecuteAsync(sql, new
                {
                    content = newGHabit.Content,
                    gHabitId = newGHabit.GHabitId,
                    newGHabit.priorityOf,
                }).ConfigureAwait(false) > 0) { return; }
            }

            throw new ArgumentException("Failed to Update GHabit");
        }

        //delete
        public async Task Delete(int gHabitId)
        {
            const string sql = @"DELETE FROM bbetterSchema.GHabits
            WHERE GHabitId = @gHabitId";
            using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
            {
                if (await _dbConnection.ExecuteAsync(sql, new { gHabitId }).ConfigureAwait(false) > 0) { return; }
            }

            throw new ArgumentException("Failed to Delete GHabits");
        }

        //delete-by-account
        public async Task DeleteMany(int accountId)
        {
            const string sql = @"DELETE FROM bbetterSchema.GHabits
            WHERE AccountId = @accountId";
            using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
            {
                if (await _dbConnection.ExecuteAsync(sql, new { accountId }).ConfigureAwait(false) > 0) { return; }
            }

            throw new ArgumentException("Failed to Delete GHabits");
        }
    }
}

