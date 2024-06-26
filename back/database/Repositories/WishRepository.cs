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
    public class WishRepository(IOptions<DbConfig> dbConfig)
    {
        //get-task
        public async Task<Wish> GetById(int wishId)
        {
            try
            {
                const string sql = @"SELECT * FROM bbetterSchema.Wishes
                WHERE WishId = @wishId";
                using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
                {
                    var wish = await _dbConnection.QuerySingleAsync<Wish>(sql, new { wishId }).ConfigureAwait(false);
                    return wish;
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentException("Failed to Get Wish", ex);
            }
        }

        //get-tasks
        public async Task<List<Wish>> GetByAccount(int accountId)
        {
            try
            {
                const string sql = @"SELECT * FROM bbetterSchema.Wishes
                WHERE AccountId = @accountId";
                using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
                {
                    var wishes = await _dbConnection.QueryAsync<Wish>(sql, new { accountId }).ConfigureAwait(false);

                    if (!wishes.Any())
                    {
                        return [];
                    }

                    var result = wishes.ToList();

                    return result;
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentException("Failed to Get Wishes", ex);
            }
        }

        //create
        public async Task<Wish> Add(Wish wish)
        {
            try
            {

                const string sql = @"INSERT INTO bbetterSchema.Wishes
                ([AccountId],[Content],[IsCompleted],[CompleteDate],[priorityOf]) 
                OUTPUT INSERTED.*
                VALUES (@accountId, @content, @isCompleted, @completeDate, @priorityOf)";

                using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
                {
                    return await _dbConnection.QuerySingleAsync<Wish>(sql, new
                    {
                        accountId = wish.AccountId,
                        content = wish.Content,
                        isCompleted = wish.IsCompleted,
                        completeDate = DateTime.Now,
                        wish.priorityOf,
                    }).ConfigureAwait(false);
                }
            }
            catch (Exception)
            {
                throw new ArgumentException("Failed to Add Wish");
            }
        }

        //update
        public async Task Update(Wish newWish)
        {
            try
            {
                const string sql = @"UPDATE bbetterSchema.Wishes 
                SET [Content] = @content, [IsCompleted] = @isCompleted, [CompleteDate] = @completeDate, [priorityOf] = @priorityOf
                WHERE WishId = @wishId";
                using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
                {
                    if (await _dbConnection.ExecuteAsync(sql, new
                    {
                        content = newWish.Content,
                        isCompleted = newWish.IsCompleted,
                        wishId = newWish.WishId,
                        completeDate = newWish.CompleteDate,
                        newWish.priorityOf
                    }).ConfigureAwait(false) > 0) { return; }

                }

            } catch (Exception ex)
            {
                throw new ArgumentException("Failed to Update Wish", ex);
            }
        }

        //delete
        public async Task Delete(int wishId)
        {
            const string sql = @"DELETE FROM bbetterSchema.Wishes
            WHERE WishId = @wishId";
            using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
            {
                if (await _dbConnection.ExecuteAsync(sql, new { wishId }).ConfigureAwait(false) > 0) { return; }
            }

            throw new ArgumentException("Failed to Delete Wishes");
        }

        //delete-by-account
        public async Task DeleteMany(int accountId)
        {
            const string sql = @"DELETE FROM bbetterSchema.Wishes
            WHERE AccountId = @accountId";
            using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
            {
                if (await _dbConnection.ExecuteAsync(sql, new { accountId }).ConfigureAwait(false) > 0) { return; }
            }

            throw new ArgumentException("Failed to Delete Wishes");
        }
    }
}
