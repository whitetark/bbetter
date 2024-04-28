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
    public class UserQuoteServices(IOptions<DbConfig> dbConfig)
    {
        //get-task
        public async Task<UserQuote> GetById(int quoteId)
        {
            try
            {
                string sql = @"SELECT * FROM bbetterSchema.UserQuotes
                WHERE UserQuoteId = @quoteId";
                var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection);
                var quote = await _dbConnection.QuerySingleAsync<UserQuote>(sql, new { quoteId });
                return quote;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to Get UserQuote", ex);
            }
        }

        //get-tasks
        public async Task<List<UserQuote>> GetAllByUser(int accountId)
        {
            try
            {
                string sql = @"SELECT * FROM bbetterSchema.UserQuotes
                WHERE AccountId = @accountId";
                var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection);
                var quotes = await _dbConnection.QueryAsync<UserQuote>(sql, new { accountId });

                if (quotes.Count() == 0)
                {
                    return new List<UserQuote>();
                }

                var result = quotes.ToList();

                return result;
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
                var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection);

                string sql = @"INSERT INTO bbetterSchema.UserQuotes
                ([AccountId],[Quote],[Author]) 
                OUTPUT INSERTED.*
                VALUES (@accountId, @quote, @author])";

                return await _dbConnection.QuerySingleAsync<UserQuote>(sql, new
                {
                    accountId = quote.AccountId,
                    quote = quote.Quote,
                    author = quote.Author,
                });
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        //update
        public async Task Update(UserQuote newQuote)
        {
            string sql = @"UPDATE bbetterSchema.UserQuotes 
            SET [Quote] = @quote, [Author] = @author
            WHERE UserQuoteId = @quoteId";
            var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection);
            if (await _dbConnection.ExecuteAsync(sql, new
            {
                quote = newQuote.Quote,
                quoteId = newQuote.UserQuoteId,
                author = newQuote.Author,
            }) > 0) { return; }

            throw new Exception("Failed to Update Quote");
        }

        //delete
        public async Task Delete(int quoteId)
        {
            string sql = @"DELETE FROM bbetterSchema.UserQuotes
            WHERE UserQuoteId = @quoteId";
            var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection);
            if (await _dbConnection.ExecuteAsync(sql, new { quoteId }) > 0) { return; }

            throw new Exception("Failed to Delete UserQuotes");
        }

        //delete-by-account
        public async Task DeleteMany(int accountId)
        {
            string sql = @"DELETE FROM bbetterSchema.UserQuotes
            WHERE AccountId = @accountId";
            var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection);
            if (await _dbConnection.ExecuteAsync(sql, new { accountId }) > 0) { return; }

            throw new Exception("Failed to Delete UserQuotes");
        }
    }
}
