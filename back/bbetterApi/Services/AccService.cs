using Azure.Core;
using bbetterApi.Dto;
using bbetterApi.Middleware;
using bbetterApi.Models;
using bbetterApi.Utils;
using database.Models;
using database.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Task = System.Threading.Tasks.Task;

namespace bbetterApi.Services
{
    public class AccService(AccountRepository accountRepository)
    {
        public async Task<Account> GetAccount(string username)
        {

            var user = await accountRepository.GetByUsername(username);

            return user;
        }

        public async Task DeleteAccount(int id)
        {
            await accountRepository.Delete(id);
            return;
        }

        public async Task<Account?> UpdateAccount(AccountUpdateDto updateDto)
        {
            var responseFromDb = await accountRepository.GetByUsername(updateDto.Username);
            if (responseFromDb == null)
            {
                throw new AppException("Username not found");
            }

            var newAccount = new Account
            {
                AccountId = updateDto.AccountId,
                Username = updateDto.Username,
                PasswordHash = responseFromDb.PasswordHash,
                RefreshToken = updateDto.RefreshToken,
                TokenCreated = updateDto.TokenCreated,
                TokenExpires = updateDto.TokenExpires,
                QuoteOfDayId = updateDto.QuoteOfDayId,
                QuoteExpires = updateDto.QuoteExpires,
            };

            await accountRepository.Update(newAccount);
            return newAccount;
        }

        public async Task ChangePassword(UserLoginDto request)
        {
            var responseFromDb = await accountRepository.GetByUsername(request.username);

            if (responseFromDb == null)
            {
                throw new AppException("Username not found");
            }

            var user = responseFromDb;
            string newPasswordHash = BCrypt.Net.BCrypt.HashPassword(request.password);

            user.PasswordHash = newPasswordHash;
            await accountRepository.Update(user);
            return;
        }
        public async Task<List<Account>> GetAccounts()
        {
            return await accountRepository.GetAccs();
        }

        public async Task<WhatToDoResponse> GetWhatToDo(int id)
        {
            var data = await accountRepository.GetActivitiesForToday(id);
            return WhatToDoUtil.FormatData(data);
        }

        public async Task<Statistics> GetStatistics(int id, string type)
        {

            var result = await accountRepository.GetActivitiesForDate(id, type);
            return StatsUtil.CalculateStats(result, type);
        }
    }
}
