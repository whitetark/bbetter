using Dapper;
using database.Models;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Task = System.Threading.Tasks.Task;

namespace database.Services
{
    public class BHabitServices(IOptions<DbConfig> dbConfig)
    {
        //get-task
        public async Task<BHabit> GetById(int bHabitId)
        {
            try
            {
                string sql = @"SELECT * FROM bbetterSchema.BHabits
                WHERE BHabitId = @bHabitId";
                var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection);
                var bhabit = await _dbConnection.QuerySingleAsync<BHabit>(sql, new { bHabitId });
                return bhabit;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to Get BHabit", ex);
            }
        }

        //get-tasks
        public async Task<List<BHabit>> GetByAccount(int accountId)
        {
            try
            {
                string sql = @"SELECT * FROM bbetterSchema.BHabits
                WHERE AccountId = @accountId";
                var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection);
                var bhabits = await _dbConnection.QueryAsync<BHabit>(sql, new { accountId });

                if (bhabits.Count() == 0)
                {
                    return new List<BHabit>();
                }

                var result = bhabits.ToList();

                return result;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to Get BHabit", ex);
            }
        }

        //create
        public async Task<BHabit> Add(BHabit bHabit)
        {
            try
            {
                var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection);

                string sql = @"INSERT INTO bbetterSchema.BHabits
                ([AccountId],[Content],[IssueDate]) 
                OUTPUT INSERTED.*
                VALUES (@accountId, @content, @issueDate)";

                return await _dbConnection.QuerySingleAsync<BHabit>(sql, new
                {
                    accountId = bHabit.AccountId,
                    content = bHabit.Content,
                    issueDate = bHabit.IssueDate,
                });
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        //update
        public async Task Update(BHabit newBHabit)
        {
            string sql = @"UPDATE bbetterSchema.BHabits 
            SET [Content] = @content, [IssueDate] = @issueDate, 
            WHERE BHabitId = @bHabitId";
            var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection);
            if (await _dbConnection.ExecuteAsync(sql, new
            {
                content = newBHabit.Content,
                issueDate = newBHabit.IssueDate,
                bHabitId = newBHabit.BHabitId

            }) > 0) { return; }

            throw new Exception("Failed to Update BHabit");
        }

        //delete
        public async Task Delete(int bHabitId)
        {
            string sql = @"DELETE FROM bbetterSchema.BHabits
            WHERE BHabitId = @bHabitId";
            var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection);
            if (await _dbConnection.ExecuteAsync(sql, new { bHabitId }) > 0) { return; }

            throw new Exception("Failed to Delete BHabits");
        }

        //delete-by-account
        public async Task DeleteMany(int accountId)
        {
            string sql = @"DELETE FROM bbetterSchema.BHabits
            WHERE AccountId = @accountId";
            var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection);
            if (await _dbConnection.ExecuteAsync(sql, new { accountId }) > 0) { return; }

            throw new Exception("Failed to Delete BHabits");
        }
    }
}
