using bbetter.API.Models.Stats;
using bbetter.API.Utils;
using bbetterApi.Utils;
using database.Models;
using database.Repositories;
using Microsoft.AspNetCore.Mvc;
using Task = System.Threading.Tasks.Task;

namespace bbetterApi.Services
{
    public class GHabitService(GHabitRepository ghabitRepository, GHabitDateRepository gHabitDateRepository)
    {
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

        public async Task<ActionResult<GHabitStats>> GetStats(int accountId)
        {
            var ghabits = await ghabitRepository.GetWDatesByAccount(accountId, "last28Days");

            return HabitStatsUtil.CalculateGHabitStats(ghabits);
        }

        public async Task<GHabit> CreateGHabit(GHabit gHabit)
        {
            return await ghabitRepository.Add(gHabit);
        }


        public async Task UpdateGHabit(GHabit ghabit)
        {
            await ghabitRepository.Update(ghabit);
            return;
        }


        public async Task DeleteGHabit(int id)
        {
            await gHabitDateRepository.DeleteMany(id);
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
            return await gHabitDateRepository.GetById(id);
        }


        public async Task<List<GHabitDate>> GetDatesByHabitId(int habitId)
        {
            return await gHabitDateRepository.GetByHabitId(habitId);
        }

        public async Task<List<GHabitDate>> GetDatesByMonth(int habitId)
        {
            return await gHabitDateRepository.GetByWeek(habitId);
        }


        public async Task<int[]> GetDatesByMonth(int habitId, int month, int year)
        {
            var dates = await gHabitDateRepository.GetByMonth(habitId, month, year);
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

            await gHabitDateRepository.Add(userRequest);
            return;
        }

        public async Task DeleteGHabitDate(int id, DateTime date)
        {
            var reformatedDate = date.Date;
            await gHabitDateRepository.Delete(id, reformatedDate);
            return;
        }

        public async Task DeleteGHabitDates(int habitId)
        {
            await gHabitDateRepository.DeleteMany(habitId);
            return;
        }
    }
}
