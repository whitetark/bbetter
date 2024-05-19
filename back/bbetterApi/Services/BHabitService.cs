using database.Models;
using database.Repositories;
using Microsoft.AspNetCore.Mvc;
using Task = System.Threading.Tasks.Task;

namespace bbetterApi.Services
{
    public class BHabitService(BHabitRepository bhabitRepository, BHabitDateRepository bhabitDateRepository)
    {
        public async Task<BHabit> GetBHabit(int id)
        {
            return await bhabitRepository.GetById(id);
        }

        public async Task<List<BHabit>> GetBHabits(int accountId)
        {
            return await bhabitRepository.GetByAccount(accountId);
        }


        public async Task<BHabit> CreateBHabit(BHabit bHabit)
        {
            var userRequest = new BHabit
            {
                AccountId = bHabit.AccountId,
                Content = bHabit.Content,
                IssueDate = bHabit.IssueDate,
            };
            return await bhabitRepository.Add(userRequest);
        }

        public async Task UpdateBHabit(BHabit bhabit)
        {
            await bhabitRepository.Update(bhabit);
            return;
        }

        public async Task DeleteBHabit(int id)
        {
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
            return;
        }

        public async Task DeleteBHabitDate(int id)
        {
            await bhabitDateRepository.Delete(id);
            return;
        }

        public async Task DeleteBHabitDates(int habitId)
        {
            await bhabitDateRepository.DeleteMany(habitId);
            return;
        }
    }
}
