using bbetter.API.Models.Stats;
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
        [Route("getWithDates")]
        public async Task<ActionResult<List<GHabitWithDates>>> GetWithDates([FromQuery] int accountId)
        {
            return Ok(await gHabitServices.GetWithDates(accountId).ConfigureAwait(false));
        }

        [HttpGet]
        [Route("getStats")]
        public async Task<ActionResult<GHabitStats>> GetStats([FromQuery] int accountId)
        {
            return Ok(await gHabitServices.GetStats(accountId).ConfigureAwait(false));
        }

        [HttpPost]
        [Route("create")]
        public async Task<ActionResult<GHabit>> CreateGHabit([FromBody] GHabit gHabit)
        {
            return Ok(await gHabitServices.CreateGHabit(gHabit).ConfigureAwait(false));
        }

        [HttpPut]
        [Route("update")]
        public async Task<ActionResult> UpdateGHabit([FromBody] GHabit ghabit)
        {
            await gHabitServices.UpdateGHabit(ghabit).ConfigureAwait(false);
            return Ok();
        }

        [HttpDelete]
        [Route("deleteById")]
        public async Task<ActionResult> DeleteGHabit([FromQuery] int id)
        {
            await gHabitServices.DeleteGHabit(id).ConfigureAwait(false);
            return Ok();
        }


        //Dates
        [HttpGet]
        [Route("date/getByWeek")]
        public async Task<ActionResult<List<GHabitDate>>> GetDatesByMonth([FromQuery(Name = "id")] int habitId)
        {
            return Ok(await gHabitServices.GetDatesByMonth(habitId).ConfigureAwait(false));
        }

        [HttpGet]
        [Route("date/getByMonth")]
        public async Task<ActionResult<int[]>> GetDatesByMonth([FromQuery(Name="id")] int habitId, [FromQuery(Name ="month")] int month, [FromQuery(Name = "year")] int year)
        {
            return Ok(await gHabitServices.GetDatesByMonth(habitId, month, year).ConfigureAwait(false));
        }

        [HttpPost]
        [Route("date/create")]
        public async Task<ActionResult> CreateGHabitDate([FromBody] GHabitDate date)
        {
            await gHabitServices.CreateGHabitDate(date).ConfigureAwait(false);
            return Ok();
        }

        [HttpDelete]
        [Route("date/delete")]
        public async Task<ActionResult> DeleteGHabitDate([FromQuery(Name = "id")]int id, [FromQuery(Name ="date")] DateTime date)
        {
            await gHabitServices.DeleteGHabitDate(id, date).ConfigureAwait(false);
            return Ok();
        }
    }
}
