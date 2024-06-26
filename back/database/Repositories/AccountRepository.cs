﻿using Dapper;
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
using Microsoft.AspNetCore.Http;

namespace database.Repositories
{
    public class AccountRepository(IOptions<DbConfig> dbConfig)
    {
        public async Task<Account> GetById(string id)
        {
            try
            {
                const string sql = @"SELECT * FROM bbetterSchema.Accounts
                WHERE AccountId = @id";
                using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
                {
                    var account = await _dbConnection.QuerySingleAsync<Account>(sql, new { id }).ConfigureAwait(false);
                    return account;
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentException("Failed to Get Account", ex);
            }
        }

        public async Task<Account> GetByUsername(string username)
        {
            try
            {
                const string sql = @"SELECT * FROM bbetterSchema.Accounts
                WHERE Username = @username";
                using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
                {
                    var account = await _dbConnection.QuerySingleAsync<Account>(sql, new { username }).ConfigureAwait(false);
                    return account;
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentException("Failed to Get Account", ex);
            }
        }

        public async Task<List<Account>> GetAccs()
        {
            try
            {
                const string sql = @"SELECT * FROM bbetterSchema.Accounts";
                using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
                {
                    var accounts = await _dbConnection.QueryAsync<Account>(sql).ConfigureAwait(false);
                    if (!accounts.Any())
                    {
                        return new List<Account>();
                    }

                    var result = accounts.ToList();

                    return result;
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentException("Failed to Get Account", ex);
            }
        }

        public async Task<Account> Add(Account account)
        {
            try
            {
                const string sql = @"SELECT * FROM bbetterSchema.Accounts
                WHERE Username = @username";
                using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
                {
                    var test = await _dbConnection.QueryAsync<Account>(sql, new { username = account.Username }).ConfigureAwait(false);

                    if (test.Any())
                    {
                        return null;
                    }

                const string sql2 = @"INSERT INTO bbetterSchema.Accounts
                ([Username],[PasswordHash],[RefreshToken],[TokenCreated],[TokenExpires],[QuoteOfDayId],[QuoteExpires],[isUserQuote]) 
                OUTPUT INSERTED.*
                VALUES (@username, @passwordHash, @refreshToken, @tokenCreated, @tokenExpires, @quoteId, @quoteExpires, @isUserQuote)";

                    return await _dbConnection.QuerySingleAsync<Account>(sql2, new
                    {
                        username = account.Username,
                        passwordHash = account.PasswordHash,
                        refreshToken = account.RefreshToken,
                        tokenCreated = account.TokenCreated,
                        tokenExpires = account.TokenExpires,
                        quoteId = account.QuoteOfDayId,
                        quoteExpires = account.QuoteExpires,
                        account.isUserQuote,
                    }).ConfigureAwait(false);
                }
            }
            catch (Exception ex)
            {
                throw new ArgumentException("err", ex);
            }
        }
        public async Task Delete(int id)
        {
            const string sql = @"DELETE FROM bbetterSchema.Accounts
            WHERE AccountId = @id";
            using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
            {
                if (await _dbConnection.ExecuteAsync(sql, new { id }).ConfigureAwait(false) > 0) { return; }
            }

            throw new ArgumentException("Failed to Delete Account");
        }
        public async Task Update(Account newAccount)
        {
            const string sql = @"UPDATE bbetterSchema.Accounts 
            SET [PasswordHash] = @passwordHash, [RefreshToken] = @refreshToken, [TokenCreated] = @tokenCreated, [TokenExpires] = @tokenExpires, [QuoteOfDayId] = @quote, [QuoteExpires] = @quoteExpires, [isUserQuote] = @isUserQuote
            WHERE Username = @username";
            using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
            {
                if (await _dbConnection.ExecuteAsync(sql, new
                {
                    passwordHash = newAccount.PasswordHash,
                    refreshToken = newAccount.RefreshToken,
                    tokenCreated = newAccount.TokenCreated,
                    tokenExpires = newAccount.TokenExpires,
                    username = newAccount.Username,
                    quote = newAccount.QuoteOfDayId,
                    quoteExpires = newAccount.QuoteExpires,
                    newAccount.isUserQuote
                }).ConfigureAwait(false) > 0) { return; }
            }

            throw new ArgumentException("Failed to Update Account");
        }

        public async Task<AccountActivities> GetActivitiesForToday(int accountId)
        {
            const string sql = @"
            SET DATEFIRST 1
            SELECT * FROM bbetterSchema.Tasks
            WHERE AccountId = @accountId
            AND IsCompleted = 0;
            SELECT * FROM bbetterSchema.Wishes
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

            using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
            {
                await _dbConnection.OpenAsync();
                var results = await _dbConnection.QueryMultipleAsync(sql, new { accountId }).ConfigureAwait(false);
                var tasks = results.ReadAsync<Models.Task>().Result.ToList();
                var wishes = results.ReadAsync<Wish>().Result.ToList();
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

        public async Task<AccountActivities> GetActivitiesForDate(int accountId, string type)
        {
            string dateSql = "";
            switch (type)
            {
                case "week":
                    dateSql = @"SET DATEFIRST 1;
                    DECLARE @today DATE = GETDATE();
                    DECLARE @startOfDate DATE = DATEADD(day, 1 - DATEPART(weekday, @today) - 7, @today);
                    DECLARE @endOfDate DATE = DATEADD(day, 7, @startOfDate);";
                    break;
                case "month":
                    dateSql = @"SET DATEFIRST 1;
                    DECLARE @today DATE = GETDATE();
                    DECLARE @startOfCurrentMonth DATE = DATEFROMPARTS(YEAR(@today), MONTH(@today), 1);
                    DECLARE @startOfDate DATE = DATEADD(MONTH, -1, @startOfCurrentMonth);
                    DECLARE @endOfDate DATE = @startOfCurrentMonth;";
                    break;
                case "3month":
                    dateSql = @"SET DATEFIRST 1;
                    DECLARE @today DATE = GETDATE();
                    DECLARE @startOfCurrentMonth DATE = DATEFROMPARTS(YEAR(@today), MONTH(@today), 1);
                    DECLARE @startOfDate DATE = DATEADD(MONTH, -3, @startOfCurrentMonth);
                    DECLARE @endOfDate DATE = @startOfCurrentMonth;";
                    break;
            }

            const string sql = @"
            SELECT * FROM bbetterSchema.Tasks
            WHERE AccountId = @accountId;
            SELECT * FROM bbetterSchema.Wishes
            WHERE AccountId = @accountId;
            SELECT * FROM bbetterSchema.GHabits
            WHERE AccountId = @accountId;
            SELECT GHD.GHabitDateId, GHD.DateOf, GHD.GHabitId
            FROM bbetterSchema.GHabits GH
            JOIN bbetterSchema.GHabitDate GHD ON GH.GHabitId = GHD.GHabitId
            WHERE GH.AccountId = @accountId 
            AND GHD.DateOf >= @startOfDate 
            AND GHD.DateOf < @endOfDate;";

            dateSql += sql;

            using (var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection))
            {
                await _dbConnection.OpenAsync().ConfigureAwait(false);
                var results = await _dbConnection.QueryMultipleAsync(dateSql, new { accountId }).ConfigureAwait(false);
                var tasks = results.ReadAsync<Models.Task>().Result.ToList();
                var wishes = results.ReadAsync<Wish>().Result.ToList();
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
}
  