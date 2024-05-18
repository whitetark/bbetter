using Dapper;
using database.Models;
using database;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Task = System.Threading.Tasks.Task;

namespace database.Repositories 
{ 
    public class AccountRepository(IOptions<DbConfig> dbConfig)
    {
        public async Task<Account> GetById(string id)
        {
            try
            {
                string sql = @"SELECT * FROM bbetterSchema.Accounts
                WHERE AccountId = @id";
                var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection);
                var account = await _dbConnection.QuerySingleAsync<Account>(sql, new { id });
                return account;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to Get Account", ex);
            }
        }

        public async Task<Account> GetByUsername(string username)
        {
            try
            {
                string sql = @"SELECT * FROM bbetterSchema.Accounts
                WHERE Username = @username";
                var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection);
                var account = await _dbConnection.QuerySingleAsync<Account>(sql, new { username });
                return account;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to Get Account", ex);
            }
        }

        public async Task<List<Account>> GetAccs()
        {
            try
            {
                string sql = @"SELECT * FROM bbetterSchema.Accounts";
                var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection);
                var accounts = await _dbConnection.QueryAsync<Account>(sql);
                if (accounts.Count() == 0)
                {
                    return new List<Account>();
                }

                var result = accounts.ToList();

                return result;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to Get Account", ex);
            }
        }

        public async Task<Account> Add(Account account)
        {
            try
            {
                string sql = @"SELECT * FROM bbetterSchema.Accounts
                WHERE Username = @username";
                var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection);
                var test = await _dbConnection.QueryAsync<Account>(sql, new { username = account.Username });

                if (test.Count() > 0)
                {
                    return null;
                }

                sql = @"INSERT INTO bbetterSchema.Accounts
                ([Username],[PasswordHash],[RefreshToken],[TokenCreated],[TokenExpires],[QuoteOfDayId],[QuoteExpires]) 
                OUTPUT INSERTED.*
                VALUES (@username, @passwordHash, @refreshToken, @tokenCreated, @tokenExpires, @quoteId, @quoteExpires)";

                return await _dbConnection.QuerySingleAsync<Account>(sql, new
                {
                    username = account.Username,
                    passwordHash = account.PasswordHash,
                    refreshToken = account.RefreshToken,
                    tokenCreated = account.TokenCreated,
                    tokenExpires = account.TokenExpires,
                    quoteId = account.QuoteOfDayId,
                    quoteExpires = account.QuoteExpires,
                });
            }
            catch (Exception ex)
            {
                throw new Exception("err", ex);
            }
        }
        public async Task Delete(int id)
        {
            string sql = @"DELETE FROM bbetterSchema.Accounts
            WHERE AccountId = @id";
            var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection);
            if (await _dbConnection.ExecuteAsync(sql, new { id }) > 0) { return; }

            throw new Exception("Failed to Delete Account");
        }
        public async Task Update(Account newAccount)
        {
            string sql = @"UPDATE bbetterSchema.Accounts 
            SET [PasswordHash] = @passwordHash, [RefreshToken] = @refreshToken, [TokenCreated] = @tokenCreated, [TokenExpires] = @tokenExpires, [QuoteOfDayId] = @quote, [QuoteExpires] = @quoteExpires
            WHERE Username = @username";
            var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection);
            if (await _dbConnection.ExecuteAsync(sql, new { 
                passwordHash = newAccount.PasswordHash, 
                refreshToken = newAccount.RefreshToken, 
                tokenCreated = newAccount.TokenCreated, 
                tokenExpires = newAccount.TokenExpires, 
                username = newAccount.Username, 
                quote = newAccount.QuoteOfDayId, 
                quoteExpires = newAccount.QuoteExpires }) > 0) { return; }

            throw new Exception("Failed to Update Account");
        }

        public async Task<AccountActivities> GetAllActivities(int accountId)
        {
            string sql = @"
            SET DATEFIRST 1
            SELECT T.TaskId, T.Content, T.IsUrgent, T.IsImportant, T.Deadline 
            FROM bbetterSchema.Tasks T
            WHERE AccountId = @accountId
            AND IsCompleted = 0;
            SELECT W.WishId, W.Content
            FROM bbetterSchema.Wishes W
            WHERE AccountId = @accountId
            AND IsCompleted = 0;
            SELECT * FROM bbetterSchema.GHabits
            WHERE AccountId = @accountId;
            SELECT GHD.GHabitDateId, GHD.DateOf, GHD.GHabitId
            FROM bbetterSchema.GHabits GH
            JOIN bbetterSchema.GHabitDate GHD ON GH.GHabitId = GHD.GHabitId
            WHERE GH.AccountId = @accountId 
            AND CONVERT(DATE, GHD.DateOf) = CONVERT(DATE, GETDATE());
            ";

            var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection);
            await _dbConnection.OpenAsync();
            var results = await _dbConnection.QueryMultipleAsync(sql, new { accountId });
            var tasks = results.ReadAsync<AccountTasks>().Result.ToList();
            var wishes = results.ReadAsync<AccountWishes>().Result.ToList();
            var ghabits = results.ReadAsync<GHabit>().Result.ToList();
            var ghabitDates = results.ReadAsync<GHabitWeekResult>().Result.ToList();

            List<GHabitWithDates> habitWithDates = ghabits.GroupJoin(
                        ghabitDates,
                        gHabit => gHabit.GHabitId.ToString(),
                        gHabitWeekResult => gHabitWeekResult.GHabitId,
                        (gHabit, gHabitWeekResultsGroup) =>
                            new GHabitWithDates
                            {
                                GHabitId = gHabit.GHabitId.ToString(),
                                AccountId = gHabit.AccountId,
                                Content = gHabit.Content,
                                GHabitDates = gHabitWeekResultsGroup.ToList()
                            })
                    .ToList();

            var result = new AccountActivities
            {
                accountId = accountId,
                tasks = tasks,
                wishes = wishes,
                ghabits = habitWithDates,
            };

            return result;
        }
    }
}