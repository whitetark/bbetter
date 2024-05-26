using bbetter.Database.Models;
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
    public class BHabitRepository(IOptions<DbConfig> dbConfig)
    {
        //get
        public async Task<BHabit> GetById(int bHabitId)
        {
            try
            {
                const string sql = @"SELECT * FROM bbetterSchema.BHabits
                WHERE BHabitId = @bHabitId";
                using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
                {
                    var bhabit = await _dbConnection.QuerySingleAsync<BHabit>(sql, new { bHabitId }).ConfigureAwait(false);
                    return bhabit;
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentException("Failed to Get BHabit", ex);
            }
        }

        //get-many
        public async Task<List<BHabit>> GetByAccount(int accountId)
        {
            try
            {
                const string sql = @"SELECT * FROM bbetterSchema.BHabits
                WHERE AccountId = @accountId";
                using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
                {
                    var bhabits = await _dbConnection.QueryAsync<BHabit>(sql, new { accountId }).ConfigureAwait(false);

                    if (!bhabits.Any())
                    {
                        return [];
                    }

                    var result = bhabits.ToList();

                    return result;
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentException("Failed to Get BHabit", ex);
            }
        }

        //get-w-dates
        public async Task<List<BHabitWithDates>> GetWDatesByAccount(int accountId)
        {
            try
            {
                const string sql = @"
                SELECT * FROM bbetterSchema.BHabits
                WHERE AccountId = @accountId;
                SELECT BHD.BHabitDateId, BHD.BHabitId, BHD.DateOf FROM bbetterSchema.BHabits BH
                JOIN bbetterSchema.BHabitDate BHD ON BH.BHabitId = BHD.BHabitId
                WHERE BH.AccountId = @accountId;";

                using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
                {
                    await _dbConnection.OpenAsync();
                    var results = await _dbConnection.QueryMultipleAsync(sql, new { accountId }).ConfigureAwait(false);
                    var bhabits = results.ReadAsync<BHabit>().Result.ToList();
                    var bhabitDates = results.ReadAsync<BHabitDate>().Result.ToList();

                    List<BHabitWithDates> habitWithDates = bhabits.GroupJoin(
                            bhabitDates,
                            bHabit => bHabit.BHabitId,
                            bHabitDate => bHabitDate.BHabitId,
                            (bHabit, bHabitDateResultsGroup) =>
                                new BHabitWithDates
                                {
                                    BHabitId = bHabit.BHabitId,
                                    AccountId = bHabit.AccountId,
                                    IssueDate = bHabit.IssueDate,
                                    LastDate = bHabit.LastDate,
                                    Content = bHabit.Content,
                                    BHabitDates = bHabitDateResultsGroup.ToList()
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

        //create
        public async Task<BHabit> Add(BHabit bHabit)
        {
            try
            {
                const string sql = @"INSERT INTO bbetterSchema.BHabits
                ([AccountId],[Content],[IssueDate],[LastDate]) 
                OUTPUT INSERTED.*
                VALUES (@accountId, @content, @issueDate, @lastDate)";

                using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
                {
                    return await _dbConnection.QuerySingleAsync<BHabit>(sql, new
                    {
                        accountId = bHabit.AccountId,
                        content = bHabit.Content,
                        issueDate = bHabit.IssueDate,
                        lastDate = bHabit.IssueDate,
                    }).ConfigureAwait(false);
                }

            }
            catch (Exception)
            {
                throw new ArgumentException("Failed to Add BHabit");
            }
        }

        //update
        public async Task Update(BHabit newBHabit)
        {
            const string sql = @"UPDATE bbetterSchema.BHabits 
            SET [Content] = @content, [IssueDate] = @issueDate, [LastDate] = @lastDate
            WHERE BHabitId = @bHabitId";
            using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
            {
                if (await _dbConnection.ExecuteAsync(sql, new
                {
                    content = newBHabit.Content,
                    issueDate = newBHabit.IssueDate,
                    bHabitId = newBHabit.BHabitId,
                    lastDate = newBHabit.LastDate,

                }).ConfigureAwait(false) > 0) { return; }
            }

            throw new ArgumentException("Failed to Update BHabit");
        }

        //delete
        public async Task Delete(int bHabitId)
        {
            const string sql = @"DELETE FROM bbetterSchema.BHabits
            WHERE BHabitId = @bHabitId";
            using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
            {
                if (await _dbConnection.ExecuteAsync(sql, new { bHabitId }).ConfigureAwait(false) > 0) { return; }
            }

            throw new ArgumentException("Failed to Delete BHabits");
        }

        //delete-by-account
        public async Task DeleteMany(int accountId)
        {
            const string sql = @"DELETE FROM bbetterSchema.BHabits
            WHERE AccountId = @accountId";
            using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
            {
                if (await _dbConnection.ExecuteAsync(sql, new { accountId }).ConfigureAwait(false) > 0) { return; }
            }

            throw new ArgumentException("Failed to Delete BHabits");
        }
    }
}
