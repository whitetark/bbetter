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


        [HttpPost]
        [Route("create")]
        public async Task<GHabit> CreateGHabit(GHabit gHabit)
        {
            return await gHabitServices.Add(gHabit);
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

        [HttpPost]
        [Route("date/create")]
        public async Task CreateGHabitDate(GHabitDate date)
        {
            await gHabitDateServices.Add(date);
            return;
        }

        [HttpDelete]
        [Route("date/deleteById/{id}")]
        public async Task DeleteGHabitDate(int id)
        {
            await gHabitDateServices.Delete(id);
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
