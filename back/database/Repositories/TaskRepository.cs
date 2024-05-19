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

namespace database.Repositories
{
    public class TaskRepository(IOptions<DbConfig> dbConfig)
    {

        //get-task
        public async Task<Models.Task> GetById(int taskid)
        {
            try
            {
                string sql = @"SELECT * FROM bbetterSchema.Tasks
                WHERE TaskId = @taskid";
                var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection);
                var task = await _dbConnection.QuerySingleAsync<Models.Task>(sql, new { taskid });
                return task;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to Get Task", ex);
            }
        }

        //get-tasks
        public async Task<List<Models.Task>> GetByAccount(int accountId)
        {
            try
            {
                string sql = @"SELECT * FROM bbetterSchema.Tasks
                WHERE AccountId = @accountId";
                var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection);
                var tasks = await _dbConnection.QueryAsync<Models.Task>(sql, new { accountId });

                if(tasks.Count() == 0)
                {
                    return new List<Models.Task>();
                }

                var result = tasks.ToList();

                return result;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to Get Task", ex);
            }
        }

        //create
        public async Task<Models.Task> Add(Models.Task task)
        {
            try
            {
                var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection);

                string sql = @"INSERT INTO bbetterSchema.Tasks
                ([AccountId],[Content],[IsUrgent],[IsImportant],[Deadline],[IsCompleted],[CompleteDate]) 
                OUTPUT INSERTED.*
                VALUES (@accountId, @content, @isUrgent, @isImportant, @deadline, @isCompleted, @completeDate)";

                return await _dbConnection.QuerySingleAsync<Models.Task>(sql, new
                {
                    accountId = task.AccountId,
                    content = task.Content,
                    isUrgent = task.IsUrgent,
                    isImportant = task.IsImportant,
                    deadline = task.Deadline,
                    isCompleted = task.IsCompleted,
                    completeDate = task.CompleteDate
                });
            }
            catch (Exception ex)
            {
                throw new Exception("Task added error: ", ex);
            }
        }

        //update
        public async Task Update(Models.Task newTask)
        {
            string sql = @"UPDATE bbetterSchema.Tasks 
            SET [Content] = @content, [IsUrgent] = @isUrgent, [IsImportant] = @isImportant, [Deadline] = @deadline, [IsCompleted] = @isCompleted, [CompleteDate] = @completeDate
            WHERE TaskId = @taskId";
            var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection);
            if (await _dbConnection.ExecuteAsync(sql, new 
            { 
               content = newTask.Content,
               isUrgent = newTask.IsUrgent,
               isImportant = newTask.IsImportant,
               deadline = newTask.Deadline,
               isCompleted = newTask.IsCompleted,
               taskId = newTask.TaskId,
               completeDate = newTask.CompleteDate
            }) > 0) { return; }

            throw new Exception("Failed to Update Task");
        }

        //delete
        public async Task Delete(int taskId)
        {
            string sql = @"DELETE FROM bbetterSchema.Tasks
            WHERE TaskId = @taskId";
            var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection);
            if (await _dbConnection.ExecuteAsync(sql, new { taskId }) > 0) { return; }

            throw new Exception("Failed to Delete Task");
        }

        //delete-by-account
        public async Task DeleteMany(int accountId)
        {
            string sql = @"DELETE FROM bbetterSchema.Tasks
            WHERE AccountId = @accountId";
            var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection);
            if (await _dbConnection.ExecuteAsync(sql, new { accountId }) > 0) { return; }

            throw new Exception("Failed to Delete Tasks");
        }
    }
}
