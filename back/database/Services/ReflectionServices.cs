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
    public class ReflectionServices(IOptions<DbConfig> dbConfig)
    {
        //get-task
        public async Task<Reflection> GetById(int reflectionid)
        {
            try
            {
                string sql = @"SELECT * FROM bbetterSchema.Reflections
                WHERE ReflectionId = @reflectionid";
                var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection);
                var refl = await _dbConnection.QuerySingleAsync<Reflection>(sql, new { reflectionid });
                return refl;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to Get Reflection", ex);
            }
        }

        //get-tasks
        public async Task<List<Reflection>> GetByAccount(int accountId)
        {
            try
            {
                string sql = @"SELECT * FROM bbetterSchema.Reflections
                WHERE AccountId = @accountId";
                var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection);
                var refl = await _dbConnection.QueryAsync<Reflection>(sql, new { accountId });

                if (refl.Count() == 0)
                {
                    return new List<Reflection>();
                }

                var result = refl.ToList();

                return result;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to Get Reflection", ex);
            }
        }

        //create
        public async Task<Reflection> Add(Reflection reflection)
        {
            try
            {
                var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection);

                string sql = @"INSERT INTO bbetterSchema.Reflection
                ([AccountId],[DateOf],[Emotion],[Productivity],[ThreeWords],[UserGoal]) 
                OUTPUT INSERTED.*
                VALUES (@accountId, @dateOf, @emotion, @productivity, @threeWords, @userGoal)";

                return await _dbConnection.QuerySingleAsync<Reflection>(sql, new
                {
                    accountId = reflection.AccountId,
                    dateOf = reflection.DateOf,
                    emotion = reflection.Emotion,
                    productivity = reflection.Productivity,
                    threeWords = reflection.ThreeWords,
                    userGoal = reflection.UserGoal,
                });
            }
            catch (Exception ex)
            {
                throw new Exception("Reflection added error: ", ex);
            }
        }

        //update
        public async Task Update(Reflection newReflection)
        {
            string sql = @"UPDATE bbetterSchema.Reflections
            SET [Emotion] = @emotion, [Productivity] = @productivity, [ThreeWords] = @threeWords, [UserGoal] = @userGoal
            WHERE ReflectionId = @reflectionId";
            var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection);
            if (await _dbConnection.ExecuteAsync(sql, new
            {
               emotion = newReflection.Emotion,
               productivity = newReflection.Productivity,
               threeWords = newReflection.ThreeWords,
               userGoal = newReflection.UserGoal,
               reflectionId = newReflection.ReflectionId,
            }) > 0) { return; }

            throw new Exception("Failed to Update Reflection");
        }

        //delete
        public async Task Delete(int reflectionId)
        {
            string sql = @"DELETE FROM bbetterSchema.Reflections
            WHERE ReflectionId = @reflectionId";
            var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection);
            if (await _dbConnection.ExecuteAsync(sql, new { reflectionId }) > 0) { return; }

            throw new Exception("Failed to Delete Reflection");
        }

        //delete-by-account
        public async Task DeleteMany(int accountId)
        {
            string sql = @"DELETE FROM bbetterSchema.Reflections
            WHERE AccountId = @accountId";
            var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection);
            if (await _dbConnection.ExecuteAsync(sql, new { accountId }) > 0) { return; }

            throw new Exception("Failed to Delete Reflections");
        }
    }
}
