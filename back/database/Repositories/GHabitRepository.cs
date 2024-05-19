using Dapper;
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
    public class GHabitRepository(IOptions<DbConfig> dbConfig)
    {
        //get-task
        public async Task<GHabit> GetById(int gHabitId)
        {
            try
            {
                string sql = @"SELECT * FROM bbetterSchema.GHabits
                WHERE GHabitId = @gHabitId";
                using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
                {
                    var ghabit = await _dbConnection.QuerySingleAsync<GHabit>(sql, new { gHabitId });
                    return ghabit;
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to Get GHabit", ex);
            }
        }

        //get-by-account-with-dates
        public async Task<List<GHabitWithDates>> GetWDatesByAccount(int accountId)
        {
            try
            {

                string sql = @"SET DATEFIRST 1
                SELECT * FROM bbetterSchema.GHabits
                WHERE AccountId = @accountId;
                SELECT GHD.GHabitDateId, GHD.DateOf, GHD.GHabitId
                FROM bbetterSchema.GHabits GH
                JOIN bbetterSchema.GHabitDate GHD ON GH.GHabitId = GHD.GHabitId
                WHERE GH.AccountId = @accountId 
                AND DATEPART(week, DateOf) = DATEPART(week, GETDATE())
                AND DATEPART(year, DateOf) = DATEPART(year, GETDATE());";

                using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
                {
                    await _dbConnection.OpenAsync();
                    var results = await _dbConnection.QueryMultipleAsync(sql, new { accountId });
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
                                    GHabitDates = gHabitDateResultsGroup.ToList()
                                })
                        .ToList();

                    return habitWithDates;
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to Get GHabit", ex);
            }
        }

        //get-tasks
        public async Task<List<GHabit>> GetByAccount(int accountId)
        {
            try
            {
                string sql = @"SELECT * FROM bbetterSchema.GHabits
                WHERE AccountId = @accountId";
                using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
                {
                    var ghabits = await _dbConnection.QueryAsync<GHabit>(sql, new { accountId });

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
                throw new Exception("Failed to Get GHabit", ex);
            }
        }

        //create
        public async Task<GHabit> Add(GHabit gHabit)
        {
            try
            {
                using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
                {
                    string sql = @"INSERT INTO bbetterSchema.GHabits
                ([AccountId],[Content]) 
                OUTPUT INSERTED.*
                VALUES (@accountId, @content)";

                    return await _dbConnection.QuerySingleAsync<GHabit>(sql, new
                    {
                        accountId = gHabit.AccountId,
                        content = gHabit.Content,
                    });
                }
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        //update
        public async Task Update(GHabit newGHabit)
        {
            string sql = @"UPDATE bbetterSchema.GHabits 
            SET [Content] = @content, 
            WHERE GHabitId = @gHabitId";
            using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
            {
                if (await _dbConnection.ExecuteAsync(sql, new
                {
                    content = newGHabit.Content,
                    gHabitId = newGHabit.GHabitId,

                }) > 0) { return; }
            }

            throw new Exception("Failed to Update GHabit");
        }

        //delete
        public async Task Delete(int gHabitId)
        {
            string sql = @"DELETE FROM bbetterSchema.GHabits
            WHERE GHabitId = @gHabitId";
            using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
            {
                if (await _dbConnection.ExecuteAsync(sql, new { gHabitId }) > 0) { return; }
            }

            throw new Exception("Failed to Delete GHabits");
        }

        //delete-by-account
        public async Task DeleteMany(int accountId)
        {
            string sql = @"DELETE FROM bbetterSchema.GHabits
            WHERE AccountId = @accountId";
            using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
            {
                if (await _dbConnection.ExecuteAsync(sql, new { accountId }) > 0) { return; }
            }

            throw new Exception("Failed to Delete GHabits");
        }
    }
}

