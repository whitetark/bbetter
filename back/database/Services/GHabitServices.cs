﻿using Dapper;
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
    public class GHabitServices(IOptions<DbConfig> dbConfig)
    {
        //get-task
        public async Task<GHabit> GetGHabitById(string gHabitId)
        {
            try
            {
                string sql = @"SELECT * FROM bbetterSchema.GHabits
                WHERE GHabitId = @gHabitId";
                var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection);
                var ghabit = await _dbConnection.QuerySingleAsync<GHabit>(sql, new { gHabitId });
                return ghabit;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to Get GHabit", ex);
            }
        }

        //get-tasks
        public async Task<List<GHabit>> GetGHabitsByAccount(string accountId)
        {
            try
            {
                string sql = @"SELECT * FROM bbetterSchema.GHabits
                WHERE AccountId = @accountId";
                var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection);
                var ghabits = await _dbConnection.QueryAsync<GHabit>(sql, new { accountId });

                if (ghabits.Count() == 0)
                {
                    return new List<GHabit>();
                }

                var result = ghabits.ToList();

                return result;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to Get GHabit", ex);
            }
        }

        //create
        public async Task<GHabit> AddGHabit(GHabit gHabit)
        {
            try
            {
                var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection);

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
            catch (Exception)
            {
                throw new Exception();
            }
        }

        //update
        public async Task UpdateGHabit(GHabit newGHabit)
        {
            string sql = @"UPDATE bbetterSchema.GHabits 
            SET [Content] = @content, 
            WHERE GHabitId = @gHabitId";
            var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection);
            if (await _dbConnection.ExecuteAsync(sql, new
            {
                content = newGHabit.Content,
                gHabitId = newGHabit.GHabitId,
            
            }) > 0) { return; }

            throw new Exception("Failed to Update GHabit");
        }

        //delete
        public async Task DeleteGHabit(string gHabitId)
        {
            string sql = @"DELETE FROM bbetterSchema.GHabits
            WHERE GHabitId = @gHabitId";
            var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection);
            if (await _dbConnection.ExecuteAsync(sql, new { gHabitId }) > 0) { return; }

            throw new Exception("Failed to Delete GHabits");
        }

        //delete-by-account
        public async Task DeleteGHabits(string accountId)
        {
            string sql = @"DELETE FROM bbetterSchema.GHabits
            WHERE AccountId = @accountId";
            var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection);
            if (await _dbConnection.ExecuteAsync(sql, new { accountId }) > 0) { return; }

            throw new Exception("Failed to Delete GHabits");
        }
    }
}

