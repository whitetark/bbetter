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
    public class ReflectController(ReflectService reflectionServices) : ControllerBase
    {

        [HttpGet]
        [Route("getByMonth")]
        public async Task<ActionResult<List<Reflection>>> GetDatesByMonth([FromQuery(Name ="id")] int accountId, [FromQuery(Name = "month")] int month, [FromQuery(Name = "year")] int year)
        {
            return Ok(await reflectionServices.GetDatesByMonth(accountId, month, year));
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("getStats")]
        public async Task<ActionResult<ReflectionStats>> GetStats([FromQuery(Name = "id")] int accountId)
        {
            return Ok(await reflectionServices.GetStats(accountId));
        }

        [HttpGet]
        [Route("checkForToday")]
        public async Task<ActionResult<bool>> CheckForToday([FromQuery(Name ="id")] int accountId)
        {
            return Ok(await reflectionServices.CheckForToday(accountId));
        }

        [HttpPost]
        [Route("create")]
        public async Task<ActionResult<Reflection>> CreateReflection([FromBody] Reflection reflection)
        {
            return Ok(await reflectionServices.CreateReflection(reflection));
        }

        [HttpPut]
        [Route("update")]
        public async Task<ActionResult> UpdateReflection([FromBody] Reflection reflection)
        {
            await reflectionServices.UpdateReflection(reflection);
            return Ok();
        }

        [HttpDelete]
        [Route("deleteById")]
        public async Task<ActionResult> DeleteReflection([FromQuery] int id)
        {
            await reflectionServices.DeleteReflection(id);
            return Ok();
        }
    }
}
