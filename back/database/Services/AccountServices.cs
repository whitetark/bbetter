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

namespace database.Services
{
    public class AccountServices(IOptions<DbConfig> dbConfig)
    {

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
                    return test.FirstOrDefault();
                }

                sql = @"INSERT INTO bbetterSchema.Accounts
                ([Username],[PasswordHash],[RefreshToken],[TokenCreated],[TokenExpires]) 
                OUTPUT INSERTED.*
                VALUES (@username, @passwordHash, @refreshToken, @tokenCreated, @tokenExpires)";

                return await _dbConnection.QuerySingleAsync<Account>(sql, new
                {
                    username = account.Username,
                    passwordHash = account.PasswordHash,
                    refreshToken = account.RefreshToken,
                    tokenCreated = account.TokenCreated,
                    tokenExpires = account.TokenExpires
                });
            }
            catch (Exception)
            {
                throw new Exception();
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
            SET [PasswordHash] = @passwordHash, [RefreshToken] = @refreshToken, [TokenCreated] = @tokenCreated, [TokenExpires] = @tokenExpires
            WHERE Username = @username";
            var _dbConnection = new SqlConnection(dbConfig.Value.Database_Connection);
            if (await _dbConnection.ExecuteAsync(sql, new { passwordHash = newAccount.PasswordHash, refreshToken = newAccount.RefreshToken, tokenCreated = newAccount.TokenCreated, tokenExpires = newAccount.TokenExpires, username = newAccount.Username }) > 0) { return; }

            throw new Exception("Failed to Update Account");
        }
    }
}