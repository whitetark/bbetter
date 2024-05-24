using bbetter.Database.Models;
using Dapper;
using database;
using database.Models;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Options;
using Microsoft.Identity.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace bbetter.Database.Repositories
{
    public class DEventRepository(IOptions<DbConfig> dbConfig)
    {
        public async List<DEvent> GetByDate(DateTime date, int accountId)
        {

        }
        public async void Update(DEvent dEvent)
        {
            string sql = @"UPDATE bbetterSchema.DEvents
            SET [Emotion] = @emotion, [Productivity] = @productivity, [ThreeWords] = @threeWords, [UserGoal] = @userGoal
            WHERE DEventId = @dEventId";
            using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
            {
                if (await _dbConnection.ExecuteAsync(sql, new
                {
                    emotion = newReflection.Emotion,
                    productivity = newReflection.Productivity,
                    threeWords = newReflection.ThreeWords,
                    userGoal = newReflection.UserGoal,
                    reflectionId = newReflection.ReflectionId,
                }) > 0) { return; }
            }

            throw new Exception("Failed to Update Reflection");
        }
        public async void Create(DEvent dEvent)
        {

        }
        public async void Delete(int dEventId)
        {
            string sql = @"DELETE FROM bbetterSchema.DEvents
            WHERE DEventId = @dEventId";
            using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
            {
                if (await _dbConnection.ExecuteAsync(sql, new { dEventId }) > 0) { return; }
            }

            throw new Exception("Failed to Delete BEvent");
        }
        public async void DeleteMany(DateTime date, int accountId)
        {
            //Declare dates

            string sql = @"DELETE FROM bbetterSchema.DEvents
            WHERE AccountId = @accountId";
            using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
            {
                if (await _dbConnection.ExecuteAsync(sql, new { accountId }) > 0) { return; }
            }

            throw new Exception("Failed to Delete BEvents");
        }
        public async void DeleteMany(int accountId)
        {
            string sql = @"DELETE FROM bbetterSchema.DEvents
            WHERE AccountId = @accountId";
            using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
            {
                if (await _dbConnection.ExecuteAsync(sql, new { accountId }) > 0) { return; }
            }

            throw new Exception("Failed to Delete BEvents");
        }
    }
}
