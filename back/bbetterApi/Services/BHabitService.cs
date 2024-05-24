using bbetter.API.Models.Stats;
using bbetter.API.Utils;
using database.Models;
using database.Repositories;
using Microsoft.AspNetCore.Mvc;
using static System.Runtime.InteropServices.JavaScript.JSType;
using Task = System.Threading.Tasks.Task;

namespace bbetterApi.Services
{
    public class BHabitService(BHabitRepository bhabitRepository, BHabitDateRepository bhabitDateRepository)
    {
        public async Task<BHabit> GetBHabit(int id)
        {
            return await bhabitRepository.GetById(id);
        }

        public async Task<List<BHabitWithStats>> GetBHabits(int accountId)
        {
            var data = await bhabitRepository.GetWDatesByAccount(accountId);
            return HabitStatsUtil.CalculateBHabitStats(data);
        }


        public async Task<BHabit> CreateBHabit(BHabit bHabit)
        {
            var bhabitResult = await bhabitRepository.Add(bHabit);


            return bhabitResult;
        }

        public async Task UpdateBHabit(BHabit bhabit)
        {
            await bhabitRepository.Update(bhabit);
            return;
        }

        public async Task DeleteBHabit(int id)
        {
            await bhabitDateRepository.DeleteMany(id);
            await bhabitRepository.Delete(id);
            return;
        }

        public async Task DeleteBHabits(int accountId)
        {
            await bhabitRepository.DeleteMany(accountId);
            return;
        }

        //Dates
        public async Task<object> GetDatesByMonth(int habitId, int month, int year)
        {
            var dates = await bhabitDateRepository.GetByMonth(habitId, month, year);
            var days = dates.Select(h => h.DateOf.Day).ToArray();

            return new { dates, days };

        }

        public async Task<List<BHabitDate>> GetDatesByHabitId(int habitId)
        {
            return await bhabitDateRepository.GetByHabitId(habitId);
        }


        public async Task CreateBHabitDate(BHabitDate date)
        {
            var userRequest = new BHabitDate
            {
                BHabitId = date.BHabitId,
                DateOf = date.DateOf
            };

            await bhabitDateRepository.Add(userRequest);

            var bhabit = await bhabitRepository.GetById(date.BHabitId);

            var recent = await bhabitDateRepository.GetRecent(bhabit.BHabitId);

            if (bhabit.LastDate < recent.DateOf)
            {
                bhabit.LastDate = recent.DateOf;
                await bhabitRepository.Update(bhabit);
            }

            return;
        }

        public async Task DeleteBHabitDate(int id)
        {
            var bHabitDate = await bhabitDateRepository.GetByHabitDateId(id);
            var bhabit = await bhabitRepository.GetById(bHabitDate.BHabitId);

            await bhabitDateRepository.Delete(id);

            var recent = await bhabitDateRepository.GetRecent(bhabit.BHabitId);

            if (recent == null)
            {
                bhabit.LastDate = bhabit.IssueDate;
            }
            else
            {
                bhabit.LastDate = recent.DateOf;
            }

            await bhabitRepository.Update(bhabit);
            return;
        }

        public async Task DeleteBHabitDates(int habitId)
        {
            await bhabitDateRepository.DeleteMany(habitId);
            return;
        }

    }
}
