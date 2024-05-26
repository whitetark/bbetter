using Azure.Core;
using bbetter.API.Clients;
using bbetter.API.Models.Responses;
using bbetter.API.Models.Stats;
using bbetter.API.Utils;
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
    public class AccService(AccountRepository accountRepository, GPTClient gPTClient)
    {
        public async Task<Account> GetAccount(string username)
        {
            return await accountRepository.GetByUsername(username).ConfigureAwait(false);
        }

        public async Task DeleteAccount(int id)
        {
            await accountRepository.Delete(id).ConfigureAwait(false);
            return;
        }

        public async Task<Account?> UpdateAccount(Account updateDto)
        {
            var responseFromDb = await accountRepository.GetByUsername(updateDto.Username).ConfigureAwait(false) ?? throw new AppException("Username not found");
           
            await accountRepository.Update(updateDto);
            return updateDto;
        }

        public async Task ChangePassword(UserLoginDto request)
        {
            var responseFromDb = await accountRepository.GetByUsername(request.username).ConfigureAwait(false) ?? throw new AppException("Username not found");
            var user = responseFromDb;
            string newPasswordHash = BCrypt.Net.BCrypt.HashPassword(request.password);

            user.PasswordHash = newPasswordHash;
            await accountRepository.Update(user).ConfigureAwait(false);
            return;
        }
        public async Task<List<Account>> GetAccounts()
        {
            return await accountRepository.GetAccs().ConfigureAwait(false);
        }

        public async Task<WhatToDoResponse> GetWhatToDo(int accountId)
        {
            var activities = await accountRepository.GetActivitiesForToday(accountId).ConfigureAwait(false);

            if (activities.GetTotalActivities() < 9)
            {
                return WhatToDoUtil.FormatData(activities);
            }

            var activitiesText = PromptUtil.TransformAccountActivitiesToString(activities);
            var gptResponse = await gPTClient.GetWhatToDo(activitiesText).ConfigureAwait(false);

            if (gptResponse == null)
            {
                return WhatToDoUtil.FormatData(activities);
            }

            return WhatToDoUtil.ParseWhatToDoResponse(gptResponse, accountId);
        }

        public async Task<Statistics> GetStatistics(int id, string type)
        {
            var result = await accountRepository.GetActivitiesForDate(id, type).ConfigureAwait(false);
            return WeeklyStatsUtil.CalculateStats(result, type);
        }
    }
}

