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
    public class BHabitController(BHabitService bHabitServices, IConfiguration configuration) : ControllerBase
    {
        [HttpGet]
        [Route("getById/{id}")]
        public async Task<BHabit> GetBHabit(int id)
        {
            return await bHabitServices.GetBHabit(id);
        }

        [HttpGet]
        [Route("getAll/{accountId}")]
        public async Task<List<BHabit>> GetBHabits(int accountId)
        {
            return await bHabitServices.GetBHabits(accountId);
        }


        [HttpPost]
        [Route("create")]
        public async Task<BHabit> CreateBHabit(BHabit bHabit)
        {
            return await bHabitServices.CreateBHabit(bHabit);
        }

        [HttpPut]
        [Route("update")]
        public async Task UpdateBHabit(BHabit bhabit)
        {
            await bHabitServices.UpdateBHabit(bhabit);
            return;
        }

        [HttpDelete]
        [Route("deleteById/{id}")]
        public async Task DeleteBHabit(int id)
        {
            await bHabitServices.DeleteBHabit(id);
            return;
        }

        [HttpDelete]
        [Route("deleteByAccount/{accountId}")]
        public async Task DeleteBHabits(int accountId)
        {
            await bHabitServices.DeleteBHabits(accountId);
            return;
        }

        //Dates
        [HttpGet]
        [Route("date/getByMonth")]
        public async Task<ActionResult<BHabitDate>> GetDatesByMonth([FromQuery(Name = "id")] int habitId, [FromQuery(Name = "month")] int month, [FromQuery(Name = "year")] int year)
        {
            var result =  await bHabitServices.GetDatesByMonth(habitId, month, year);
            return Ok(result);

        }

        [HttpGet]
        [Route("date/getAll/{habitId}")]
        public async Task<List<BHabitDate>> GetDatesByHabitId(int habitId)
        {
            return await bHabitServices.GetDatesByHabitId(habitId);
        }


        [HttpPost]
        [Route("date/create")]
        public async Task CreateBHabitDate(BHabitDate date)
        {

            await bHabitServices.CreateBHabitDate(date);
            return;
        }

        [HttpDelete]
        [Route("date/delete")]
        public async Task DeleteBHabitDate([FromQuery(Name = "id")] int id)
        {
            await bHabitServices.DeleteBHabitDate(id);
            return;
        }

        [HttpDelete]
        [Route("date/deleteMany/{habitId}")]
        public async Task DeleteBHabitDates(int habitId)
        {
            await bHabitServices.DeleteBHabitDates(habitId);
            return;
        }
    }
}
