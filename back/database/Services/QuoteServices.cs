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
    public class QuoteServices(IOptions<DbConfig> dbConfig)
    {
        //get-task
        public async Task<Quote> GetById(int quoteId)
        {
            try
            {
                string sql = @"SELECT * FROM bbetterSchema.Quotes
                WHERE QuoteId = @quoteId";
                var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection);
                var quote = await _dbConnection.QuerySingleAsync<Quote>(sql, new { quoteId });
                return quote;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to Get Quote", ex);
            }
        }

        //get-tasks
        public async Task<List<Quote>> GetAll()
        {
            try
            {
                string sql = @"SELECT * FROM bbetterSchema.Quotes";
                var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection);
                var quotes = await _dbConnection.QueryAsync<Quote>(sql);

                if (quotes.Count() == 0)
                {
                    return new List<Quote>();
                }

                var result = quotes.ToList();

                return result;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to Get Quotes", ex);
            }
        }

        //create
        public async Task<Quote> Add(Quote quote)
        {
            try
            {
                var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection);

                string sql = @"INSERT INTO bbetterSchema.Quotes
                ([Author],[Content]) 
                OUTPUT INSERTED.*
                VALUES (@author, @content)";

                return await _dbConnection.QuerySingleAsync<Quote>(sql, new
                {
                    author = quote.Author,
                    content = quote.Content,
                });
            }
            catch (Exception)
            {
                throw new Exception();
            }
        }

        //update
        public async Task Update(Quote newQuote)
        {
            string sql = @"UPDATE bbetterSchema.Quotes 
            SET [Author] = @author, [Content] = @content
            WHERE QuoteId = @quoteId";
            var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection);
            if (await _dbConnection.ExecuteAsync(sql, new
            {
                author = newQuote.Author,
                content = newQuote.Content,
                quoteId = newQuote.QuoteId
            }) > 0) { return; }

            throw new Exception("Failed to Update Quote");
        }

        //delete
        public async Task Delete(int quoteId)
        {
            string sql = @"DELETE FROM bbetterSchema.Quotes
            WHERE QuoteId = @quoteId";
            var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection);
            if (await _dbConnection.ExecuteAsync(sql, new { quoteId }) > 0) { return; }

            throw new Exception("Failed to Delete Quotes");
        }
    }
}
