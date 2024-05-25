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
    public class UserQuoteRepository(IOptions<DbConfig> dbConfig)
    {
        //get-task
        public async Task<UserQuote> GetById(string quoteId)
        {
            try
            {
                string sql = @"SELECT * FROM bbetterSchema.UserQuotes
                WHERE UserQuoteId = @quoteId";
                using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
                {
                    var quote = await _dbConnection.QuerySingleAsync<UserQuote>(sql, new { quoteId });
                    return quote;
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        //get-tasks
        public async Task<List<UserQuote>> GetAllByUser(int accountId)
        {
            try
            {
                string sql = @"SELECT * FROM bbetterSchema.UserQuotes
                WHERE AccountId = @accountId";
                using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
                {
                    var quotes = await _dbConnection.QueryAsync<UserQuote>(sql, new { accountId });

                    if (!quotes.Any())
                    {
                        return [];
                    }

                    var result = quotes.ToList();

                    return result;
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to Get UserQuotes", ex);
            }
        }

        //get-random
        public async Task<UserQuote?> GetRandom(string accountId)
        {
            try
            {
                string sql = @"SELECT TOP 1 *
                FROM bbetterSchema.UserQuotes
                WHERE AccountId = @accountId
                ORDER BY NEWID();";
                using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
                {
                    var quotes = await _dbConnection.QueryAsync<UserQuote>(sql, new { accountId });

                    if (!quotes.Any())
                    {
                        return null;
                    }

                    var result = quotes.FirstOrDefault();

                    return result;
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to Get UserQuotes", ex);
            }
        }

        //create
        public async Task<UserQuote> Add(UserQuote quote)
        {
            try
            {
                string sql = @"INSERT INTO bbetterSchema.UserQuotes
                ([AccountId],[Quote],[Author],[TypeOf]) 
                OUTPUT INSERTED.*
                VALUES (@accountId, @quote, @author, @typeOf)";

                using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
                {
                    return await _dbConnection.QuerySingleAsync<UserQuote>(sql, new
                    {
                        accountId = quote.AccountId,
                        quote = quote.Quote,
                        author = quote.Author,
                        typeOf = quote.TypeOf,
                    });
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error", ex);
            }
        }

        //update
        public async Task Update(UserQuote newQuote)
        {
            string sql = @"UPDATE bbetterSchema.UserQuotes 
            SET [Quote] = @quote, [Author] = @author, [TypeOf] = @typeOf
            WHERE UserQuoteId = @quoteId";
            using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
            {
                if (await _dbConnection.ExecuteAsync(sql, new
                {
                    quote = newQuote.Quote,
                    quoteId = newQuote.UserQuoteId,
                    author = newQuote.Author,
                    typeOf = newQuote.TypeOf,
                }) > 0) { return; }
            }

            throw new Exception("Failed to Update Quote");
        }

        //delete
        public async Task Delete(int quoteId)
        {
            string sql = @"DELETE FROM bbetterSchema.UserQuotes
            WHERE UserQuoteId = @quoteId";
            using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
            {
                if (await _dbConnection.ExecuteAsync(sql, new { quoteId }) > 0) { return; }
            }

            throw new Exception("Failed to Delete UserQuotes");
        }

        //delete-by-account
        public async Task DeleteMany(int accountId)
        {
            string sql = @"DELETE FROM bbetterSchema.UserQuotes
            WHERE AccountId = @accountId";
            using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
            {
                if (await _dbConnection.ExecuteAsync(sql, new { accountId }) > 0) { return; }
            }

            throw new Exception("Failed to Delete UserQuotes");
        }
    }
}
