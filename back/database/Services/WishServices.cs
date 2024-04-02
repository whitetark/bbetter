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
    public class WishServices(IOptions<DbConfig> dbConfig)
    {
        //get-task
        public async Task<Wish> GetById(int wishId)
        {
            try
            {
                string sql = @"SELECT * FROM bbetterSchema.Wishes
                WHERE WishId = @wishId";
                var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection);
                var wish = await _dbConnection.QuerySingleAsync<Wish>(sql, new { wishId });
                return wish;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to Get Wish", ex);
            }
        }

        //get-tasks
        public async Task<List<Wish>> GetByAccount(int accountId)
        {
            try
            {
                string sql = @"SELECT * FROM bbetterSchema.Wishes
                WHERE AccountId = @accountId";
                var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection);
                var wishes = await _dbConnection.QueryAsync<Wish>(sql, new { accountId });

                if (wishes.Count() == 0)
                {
                    return new List<Wish>();
                }

                var result = wishes.ToList();

                return result;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to Get Wishes", ex);
            }
        }

        //create
        public async Task<Wish> Add(Wish wish)
        {
            try
            {
                var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection);

                string sql = @"INSERT INTO bbetterSchema.Wishes
                ([AccountId],[Content],[IsCompleted]) 
                OUTPUT INSERTED.*
                VALUES (@accountId, @content, @isCompleted)";

                return await _dbConnection.QuerySingleAsync<Wish>(sql, new
                {
                    accountId = wish.AccountId,
                    content = wish.Content,
                    isCompleted = wish.IsCompleted,
                });
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        //update
        public async Task Update(Wish newWish)
        {
            string sql = @"UPDATE bbetterSchema.Wishes 
            SET [Content] = @content, [IsCompleted] = @isCompleted
            WHERE WishId = @wishId";
            var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection);
            if (await _dbConnection.ExecuteAsync(sql, new
            {
                content = newWish.Content,
                isCompleted = newWish.IsCompleted,
                wishId = newWish.WishId,
            }) > 0) { return; }

            throw new Exception("Failed to Update Wish");
        }

        //delete
        public async Task Delete(int wishId)
        {
            string sql = @"DELETE FROM bbetterSchema.Wishes
            WHERE WishId = @wishId";
            var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection);
            if (await _dbConnection.ExecuteAsync(sql, new { wishId }) > 0) { return; }

            throw new Exception("Failed to Delete Wishes");
        }

        //delete-by-account
        public async Task DeleteMany(int accountId)
        {
            string sql = @"DELETE FROM bbetterSchema.Wishes
            WHERE AccountId = @accountId";
            var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection);
            if (await _dbConnection.ExecuteAsync(sql, new { accountId }) > 0) { return; }

            throw new Exception("Failed to Delete Wishes");
        }
    }
}
