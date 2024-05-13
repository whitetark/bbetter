using bbetterApi.Dto;
using database.Models;
using database.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Task = System.Threading.Tasks.Task;

namespace bbetterApi.Controllers
{
    [Authorize(Roles = "User, Admin")]
    [Route("[controller]")]
    [ApiController]
    public class GHabitController(GHabitServices gHabitServices, GHabitDateServices gHabitDateServices, IConfiguration configuration) : ControllerBase
    {
        [HttpGet]
        [Route("getById/{id}")]
        public async Task<GHabit> GetGHabit(int id)
        {
            return await gHabitServices.GetById(id);
        }

        [HttpGet]
        [Route("getAll/{accountId}")]
        public async Task<List<GHabit>> GetGHabits(int accountId)
        {
            return await gHabitServices.GetByAccount(accountId);
        }

        [HttpGet]
        [Route("getWithDates/{accountId}")]
        public async Task<List<GHabitWithDates>> GetWithDates(int accountId)
        {
            return await gHabitServices.GetWDatesByAccount(accountId);
        }

        [HttpPost]
        [Route("create")]
        public async Task<GHabit> CreateGHabit(GHabitAddDto gHabit)
        {
            var userRequest = new GHabit
            {
                AccountId = gHabit.AccountId,
                Content = gHabit.Content,
            };

            return await gHabitServices.Add(userRequest);
        }

        [HttpPut]
        [Route("update")]
        public async Task UpdateBHabit(GHabit ghabit)
        {
            await gHabitServices.Update(ghabit);
            return;
        }

        [HttpDelete]
        [Route("deleteById/{id}")]
        public async Task DeleteGHabit(int id)
        {
            await gHabitServices.Delete(id);
            return;
        }

        [HttpDelete]
        [Route("deleteByAccount/{accountId}")]
        public async Task DeleteGHabits(int accountId)
        {
            await gHabitServices.DeleteMany(accountId);
            return;
        }

        //Dates
        [HttpGet]
        [Route("date/getById/{id}")]
        public async Task<GHabitDate> GetGHabitDatesById(int id)
        {
            return await gHabitDateServices.GetById(id);
        }

        [HttpGet]
        [Route("date/getAll/{habitId}")]
        public async Task<List<GHabitDate>> GetDatesByHabitId(int habitId)
        {
            return await gHabitDateServices.GetByHabitId(habitId);
        }

        [HttpGet]
        [Route("date/getByWeek")]
        public async Task<List<GHabitDate>> GetDatesByMonth([FromQuery(Name = "id")] int habitId)
        {
            return await gHabitDateServices.GetByWeek(habitId);
        }

        [HttpGet]
        [Route("date/getByMonth")]
        public async Task<int[]> GetDatesByMonth([FromQuery(Name="id")] int habitId, [FromQuery(Name ="month")] int month, [FromQuery(Name = "year")] int year)
        {
            var dates = await gHabitDateServices.GetByMonth(habitId, month, year);
            var days = dates.Select(h => h.DateOf.Day).ToArray();
            if(days.Length > 0)
            {
                return days;
            }

            return [];
        }

        [HttpPost]
        [Route("date/create")]
        public async Task CreateGHabitDate(GHabitDate date)
        {
            var userRequest = new GHabitDate
            {
                GHabitId = date.GHabitId,
                DateOf = date.DateOf.Date
            };

            await gHabitDateServices.Add(userRequest);
            return;
        }

        [HttpDelete]
        [Route("date/delete")]
        public async Task DeleteGHabitDate([FromQuery(Name = "id")]int id, [FromQuery(Name ="date")] DateTime date)
        {
            var reformatedDate = date.Date;
            await gHabitDateServices.Delete(id, reformatedDate);
            return;
        }

        [HttpDelete]
        [Route("date/deleteMany/{habitId}")]
        public async Task DeleteGHabitDates(int habitId)
        {
            await gHabitDateServices.DeleteMany(habitId);
            return;
        }
    }
}
