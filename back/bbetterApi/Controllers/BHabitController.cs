﻿using bbetter.API.Models;
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
        [Route("getAll")]
        public async Task<ActionResult<List<BHabitWithStats>>> GetBHabits([FromQuery] int accountId)
        {
            return Ok(await bHabitServices.GetBHabits(accountId));
        }


        [HttpPost]
        [Route("create")]
        public async Task<ActionResult<BHabit>> CreateBHabit([FromBody] BHabit bHabit)
        {
            return Ok(await bHabitServices.CreateBHabit(bHabit));
        }

        [HttpPut]
        [Route("update")]
        public async Task<ActionResult> UpdateBHabit([FromBody] BHabit bhabit)
        {
            await bHabitServices.UpdateBHabit(bhabit);
            return Ok();
        }

        [HttpDelete]
        [Route("deleteById")]
        public async Task<ActionResult> DeleteBHabit([FromQuery] int id)
        {
            await bHabitServices.DeleteBHabit(id);
            return Ok();
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
        [Route("date/getAll")]
        public async Task<ActionResult<List<BHabitDate>>> GetDatesByHabitId([FromQuery] int habitId)
        {
            return Ok(await bHabitServices.GetDatesByHabitId(habitId));
        }


        [HttpPost]
        [Route("date/create")]
        public async Task<ActionResult> CreateBHabitDate([FromBody] BHabitDate date)
        {
            await bHabitServices.CreateBHabitDate(date);
            return Ok();
        }

        [HttpDelete]
        [Route("date/delete")]
        public async Task<ActionResult> DeleteBHabitDate([FromQuery(Name = "id")] int id)
        {
            await bHabitServices.DeleteBHabitDate(id);
            return Ok();
        }
    }
}
