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
    public class BHabitController(BHabitServices bHabitServices, BHabitDateServices bHabitDateServices, IConfiguration configuration) : ControllerBase
    {
        [HttpGet]
        [Route("getById/{id}")]
        public async Task<BHabit> GetBHabit(int id)
        {
            return await bHabitServices.GetById(id);
        }

        [HttpGet]
        [Route("getAll/{accountId}")]
        public async Task<List<BHabit>> GetBHabits(int accountId)
        {
            return await bHabitServices.GetByAccount(accountId);
        }


        [HttpPost]
        [Route("create")]
        public async Task<BHabit> CreateBHabit(BHabit bHabit)
        {
            return await bHabitServices.Add(bHabit);
        }

        [HttpPut]
        [Route("update")]
        public async Task UpdateBHabit(BHabit bhabit)
        {
            await bHabitServices.Update(bhabit);
            return;
        }

        [HttpDelete]
        [Route("deleteById/{id}")]
        public async Task DeleteBHabit(int id)
        {
            await bHabitServices.Delete(id);
            return;
        }

        [HttpDelete]
        [Route("deleteByAccount/{accountId}")]
        public async Task DeleteBHabits(int accountId)
        {
            await bHabitServices.DeleteMany(accountId);
            return;
        }

        //Dates
        [HttpGet]
        [Route("date/getById/{id}")]
        public async Task<BHabitDate> GetBHabitDatesById(int id)
        {
            return await bHabitDateServices.GetById(id);
        }

        [HttpGet]
        [Route("date/getAll/{habitId}")]
        public async Task<List<BHabitDate>> GetDatesByHabitId(int habitId)
        {
            return await bHabitDateServices.GetByHabitId(habitId);
        }


        [HttpPost]
        [Route("date/create")]
        public async Task CreateBHabitDate(BHabitDate date)
        {
            await bHabitDateServices.Add(date);
            return;
        }

        [HttpDelete]
        [Route("date/deleteById/{id}")]
        public async Task DeleteBHabitDate(int id)
        {
            await bHabitDateServices.Delete(id);
            return;
        }

        [HttpDelete]
        [Route("date/deleteMany/{habitId}")]
        public async Task DeleteBHabitDates(int habitId)
        {
            await bHabitDateServices.DeleteMany(habitId);
            return;
        }
    }
}
