using bbetter.API.Models.Responses;
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
    public class TaskController(TaskService taskServices) : ControllerBase
    {
        [HttpGet]
        [Route("getByAccount")]
        public async Task<ActionResult<TaskResponse>> GetTasks([FromQuery] int accountId)
        {
            return Ok(await taskServices.GetTasks(accountId).ConfigureAwait(false));
        }

        [HttpPost]
        [Route("create")]
        public async Task<ActionResult<database.Models.Task>> CreateTask([FromBody] database.Models.Task task)
        {

            return Ok(await taskServices.CreateTask(task).ConfigureAwait(false));
        }

        [HttpPut]
        [Route("update")]
        public async Task<ActionResult> UpdateTask([FromBody] database.Models.Task task)
        {
            await taskServices.UpdateTask(task).ConfigureAwait(false);
            return Ok();
        }

        [HttpDelete]
        [Route("deleteById")]
        public async Task<ActionResult> DeleteTask([FromQuery] int id)
        {
            await taskServices.DeleteTask(id).ConfigureAwait(false);
            return Ok();
        }
    }
}
