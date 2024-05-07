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
            var userRequest = new BHabit
            {
                AccountId = bHabit.AccountId,
                Content = bHabit.Content,
                IssueDate = bHabit.IssueDate,
            };
            return await bHabitServices.Add(userRequest);
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
        [Route("date/getByMonth")]
        public async Task<ActionResult<BHabitDate>> GetDatesByMonth([FromQuery(Name = "id")] int habitId, [FromQuery(Name = "month")] int month, [FromQuery(Name = "year")] int year)
        {
            var dates = await bHabitDateServices.GetByMonth(habitId, month, year);
            var days = dates.Select(h => h.DateOf.Day).ToArray();

            return new OkObjectResult(new { dates, days });

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
            var userRequest = new BHabitDate
            {
                BHabitId = date.BHabitId,
                DateOf = date.DateOf
            };

            await bHabitDateServices.Add(userRequest);
            return;
        }

        [HttpDelete]
        [Route("date/delete")]
        public async Task DeleteBHabitDate([FromQuery(Name = "id")] int id)
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
