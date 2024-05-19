using bbetterApi.Dto;
using bbetterApi.Services;
using database.Models;
using database.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Task = System.Threading.Tasks.Task;

namespace bbetterApi.Controllers
{
    [Authorize(Roles = "User, Admin")]
    [Route("[controller]")]
    [ApiController]
    public class GHabitController(GHabitService gHabitServices) : ControllerBase
    {
        [HttpGet]
        [Route("getById/{id}")]
        public async Task<GHabit> GetGHabit(int id)
        {
            return await gHabitServices.GetGHabit(id);
        }

        [HttpGet]
        [Route("getAll/{accountId}")]
        public async Task<List<GHabit>> GetGHabits(int accountId)
        {
            return await gHabitServices.GetGHabits(accountId);
        }

        [HttpGet]
        [Route("getWithDates/{accountId}")]
        public async Task<List<GHabitWithDates>> GetWithDates(int accountId)
        {
            return await gHabitServices.GetWithDates(accountId);
        }

        [HttpPost]
        [Route("create")]
        public async Task<GHabit> CreateGHabit(GHabit gHabit)
        {

            return await gHabitServices.CreateGHabit(gHabit);
        }

        [HttpPut]
        [Route("update")]
        public async Task UpdateGHabit(GHabit ghabit)
        {
            await gHabitServices.UpdateGHabit(ghabit);
            return;
        }

        [HttpDelete]
        [Route("deleteById/{id}")]
        public async Task DeleteGHabit(int id)
        {
            await gHabitServices.DeleteGHabit(id);
            return;
        }

        [HttpDelete]
        [Route("deleteByAccount/{accountId}")]
        public async Task DeleteGHabits(int accountId)
        {
            await gHabitServices.DeleteGHabits(accountId);
            return;
        }

        //Dates
        [HttpGet]
        [Route("date/getById/{id}")]
        public async Task<GHabitDate> GetGHabitDatesById(int id)
        {
            return await gHabitServices.GetGHabitDatesById(id);
        }

        [HttpGet]
        [Route("date/getAll/{habitId}")]
        public async Task<List<GHabitDate>> GetDatesByHabitId(int habitId)
        {
            return await gHabitServices.GetDatesByHabitId(habitId);
        }

        [HttpGet]
        [Route("date/getByWeek")]
        public async Task<List<GHabitDate>> GetDatesByMonth([FromQuery(Name = "id")] int habitId)
        {
            return await gHabitServices.GetDatesByMonth(habitId);
        }

        [HttpGet]
        [Route("date/getByMonth")]
        public async Task<int[]> GetDatesByMonth([FromQuery(Name="id")] int habitId, [FromQuery(Name ="month")] int month, [FromQuery(Name = "year")] int year)
        {
            return await gHabitServices.GetDatesByMonth(habitId, month, year);
        }

        [HttpPost]
        [Route("date/create")]
        public async Task CreateGHabitDate(GHabitDate date)
        {
            await gHabitServices.CreateGHabitDate(date);
            return;
        }

        [HttpDelete]
        [Route("date/delete")]
        public async Task DeleteGHabitDate([FromQuery(Name = "id")]int id, [FromQuery(Name ="date")] DateTime date)
        {
            await gHabitServices.DeleteGHabitDate(id, date);
            return;
        }

        [HttpDelete]
        [Route("date/deleteMany/{habitId}")]
        public async Task DeleteGHabitDates(int habitId)
        {
            await gHabitServices.DeleteGHabitDates(habitId);
            return;
        }
    }
}
