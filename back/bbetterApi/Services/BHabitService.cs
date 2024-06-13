using bbetter.API.Models.Responses;
using bbetter.API.Models.Stats;
using bbetter.API.Utils;
using bbetterApi.Clients;
using database.Models;
using database.Repositories;
using Microsoft.AspNetCore.Mvc;
using static System.Runtime.InteropServices.JavaScript.JSType;
using Task = System.Threading.Tasks.Task;

namespace bbetterApi.Services
{
    public class BHabitService(BHabitRepository bhabitRepository, BHabitDateRepository bhabitDateRepository, QuotableClient quotableClient)
    {
        public async Task<BHabit> GetBHabit(int id)
        {
            return await bhabitRepository.GetById(id).ConfigureAwait(false);
        }

        public async Task<BHabitResponse> GetBHabits(int accountId)
        {
            var data = await bhabitRepository.GetWDatesByAccount(accountId).ConfigureAwait(false);
            var response =  HabitStatsUtil.CalculateBHabitStats(data);
            response.Quote = await quotableClient.GetMotivationalQuote().ConfigureAwait(false); 
            return response;
        }


        public async Task<BHabit> CreateBHabit(BHabit bHabit)
        {
            var bhabitResult = await bhabitRepository.Add(bHabit).ConfigureAwait(false);
            return bhabitResult;
        }

        public async Task UpdateBHabit(BHabit bhabit)
        {
            await bhabitRepository.Update(bhabit).ConfigureAwait(false);
            return;
        }

        public async Task DeleteBHabit(int id)
        {
            await bhabitDateRepository.DeleteMany(id).ConfigureAwait(false);
            await bhabitRepository.Delete(id).ConfigureAwait(false);
            return;
        }

        public async Task DeleteBHabits(int accountId)
        {
            await bhabitRepository.DeleteMany(accountId).ConfigureAwait(false);
            return;
        }

        //Dates
        public async Task<object> GetDatesByMonth(int habitId, int month, int year)
        {
            var dates = await bhabitDateRepository.GetByMonth(habitId, month, year).ConfigureAwait(false);
            var days = dates.Select(h => h.DateOf.Day).ToArray();

            return new { dates, days };

        }

        public async Task<List<BHabitDate>> GetDatesByHabitId(int habitId)
        {
            return await bhabitDateRepository.GetByHabitId(habitId).ConfigureAwait(false);
        }


        public async Task CreateBHabitDate(BHabitDate date)
        {
            var userRequest = new BHabitDate
            {
                BHabitId = date.BHabitId,
                DateOf = date.DateOf
            };

            await bhabitDateRepository.Add(userRequest).ConfigureAwait(false);

            var bhabit = await bhabitRepository.GetById(date.BHabitId).ConfigureAwait(false);

            var recent = await bhabitDateRepository.GetRecent(bhabit.BHabitId).ConfigureAwait(false);

            if (bhabit.LastDate < recent.DateOf)
            {
                bhabit.LastDate = recent.DateOf;
                await bhabitRepository.Update(bhabit).ConfigureAwait(false);
            }

            return;
        }

        public async Task DeleteBHabitDate(int id)
        {
            var bHabitDate = await bhabitDateRepository.GetByHabitDateId(id).ConfigureAwait(false);
            var bhabit = await bhabitRepository.GetById(bHabitDate.BHabitId).ConfigureAwait(false);

            await bhabitDateRepository.Delete(id).ConfigureAwait(false);

            var recent = await bhabitDateRepository.GetRecent(bhabit.BHabitId).ConfigureAwait(false);

            if (recent == null)
            {
                bhabit.LastDate = bhabit.IssueDate;
            }
            else
            {
                bhabit.LastDate = recent.DateOf;
            }

            await bhabitRepository.Update(bhabit).ConfigureAwait(false);
            return;
        }

        public async Task DeleteBHabitDates(int habitId)
        {
            await bhabitDateRepository.DeleteMany(habitId).ConfigureAwait(false);
            return;
        }

    }
}
