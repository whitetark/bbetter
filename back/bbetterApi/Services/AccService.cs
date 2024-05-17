using Azure.Core;
using bbetterApi.Dto;
using bbetterApi.Models;
using bbetterApi.Utils;
using database.Models;
using database.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Task = System.Threading.Tasks.Task;

namespace bbetterApi.Services
{
    public class AccService
    {
        private readonly AccountRepository accountRepository;
        public AccService(AccountRepository accountRepository)
        {
            this.accountRepository = accountRepository;
        }

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
                return null;
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
                return;
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
            var data = await accountRepository.GetAllActivities(id);
            return WhatToDoUtil.FormatData(data);
        }
    }
}
