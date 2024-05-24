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
        public async Task<List<DEvent>> GetByDate(DateTime date, int accountId)
        {
            string sql = @"SELECT * FROM bbetterSchema.DEvents
            WHERE AccountId = @accountId
            AND DAY(DateOf) = @day";

            using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
            {
                var ghabits = await _dbConnection.QueryAsync<DEvent>(sql, new { accountId, day = date.Day });

                if (!ghabits.Any())
                {
                    return [];
                }

                var result = ghabits.ToList();

                return result;
            }

            throw new Exception("Failed to Get BHabit Dates");
        }
        public async void Update(DEvent dEvent)
        {
            string sql = @"UPDATE bbetterSchema.DEvents
            SET [DateOf] = @dateOf, [Rating] = @rating, [WhatHappened] = @whatHappened
            WHERE DEventId = @dEventId";
            using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
            {
                if (await _dbConnection.ExecuteAsync(sql, new
                {
                      dateOf = dEvent.DateOf,
                      rating = dEvent.Rating,
                      whatHappened = dEvent.WhatHappened,
                }) > 0) { return; }
            }

            throw new Exception("Failed to Update DEvent");
        }
        public async Task<DEvent> Create(DEvent dEvent)
        {
            string sql = @"INSERT INTO bbetterSchema.DEvents
                ([AccountId],[DateOf],[Rating],[WhatHappenned]) 
                OUTPUT INSERTED.*
                VALUES (@accountId, @dateOf, @rating, @whatHappened)";

            using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
            {
                return await _dbConnection.QuerySingleAsync<DEvent>(sql, new
                {
                    accountId = dEvent.AccountId,
                    dateOf = dEvent.DateOf,
                    emotion = dEvent.Rating,
                    whatHappened = dEvent.WhatHappened,
                });
            }
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
            WHERE AccountId = @accountId
            AND DAY(DateOf) = @day";
            using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
            {
                if (await _dbConnection.ExecuteAsync(sql, new { accountId, day = date.Day }) > 0) { return; }
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
