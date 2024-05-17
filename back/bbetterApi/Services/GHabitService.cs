using bbetterApi.Dto;
using database.Models;
using database.Repositories;
using Microsoft.AspNetCore.Mvc;
using Task = System.Threading.Tasks.Task;

namespace bbetterApi.Services
{
    public class GHabitService
    {
        private readonly GHabitRepository ghabitRepository;
        private readonly GHabitDateRepository ghabitDateRepository;
        public GHabitService(GHabitRepository ghabitRepository, GHabitDateRepository gHabitDateRepository)
        {
            this.ghabitRepository = ghabitRepository;
            this.ghabitDateRepository = gHabitDateRepository;
        }

        public async Task<GHabit> GetGHabit(int id)
        {
            return await ghabitRepository.GetById(id);
        }

        public async Task<List<GHabit>> GetGHabits(int accountId)
        {
            return await ghabitRepository.GetByAccount(accountId);
        }

        public async Task<List<GHabitWithDates>> GetWithDates(int accountId)
        {
            return await ghabitRepository.GetWDatesByAccount(accountId);
        }


        public async Task<GHabit> CreateGHabit(GHabitAddDto gHabit)
        {
            var userRequest = new GHabit
            {
                AccountId = gHabit.AccountId,
                Content = gHabit.Content,
            };

            return await ghabitRepository.Add(userRequest);
        }


        public async Task UpdateGHabit(GHabit ghabit)
        {
            await ghabitRepository.Update(ghabit);
            return;
        }


        public async Task DeleteGHabit(int id)
        {
            await ghabitRepository.Delete(id);
            return;
        }

        public async Task DeleteGHabits(int accountId)
        {
            await ghabitRepository.DeleteMany(accountId);
            return;
        }

        //Dates
        public async Task<GHabitDate> GetGHabitDatesById(int id)
        {
            return await ghabitDateRepository.GetById(id);
        }


        public async Task<List<GHabitDate>> GetDatesByHabitId(int habitId)
        {
            return await ghabitDateRepository.GetByHabitId(habitId);
        }

        public async Task<List<GHabitDate>> GetDatesByMonth(int habitId)
        {
            return await ghabitDateRepository.GetByWeek(habitId);
        }


        public async Task<int[]> GetDatesByMonth(int habitId, int month, int year)
        {
            var dates = await ghabitDateRepository.GetByMonth(habitId, month, year);
            var days = dates.Select(h => h.DateOf.Day).ToArray();
            if (days.Length > 0)
            {
                return days;
            }

            return [];
        }

        public async Task CreateGHabitDate(GHabitDate date)
        {
            var userRequest = new GHabitDate
            {
                GHabitId = date.GHabitId,
                DateOf = date.DateOf.Date
            };

            await ghabitDateRepository.Add(userRequest);
            return;
        }

        public async Task DeleteGHabitDate(int id, DateTime date)
        {
            var reformatedDate = date.Date;
            await ghabitDateRepository.Delete(id, reformatedDate);
            return;
        }

        public async Task DeleteGHabitDates(int habitId)
        {
            await ghabitDateRepository.DeleteMany(habitId);
            return;
        }
    }
}
