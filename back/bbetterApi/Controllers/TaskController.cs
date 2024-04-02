using database.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace bbetterApi.Controllers
{
    [Authorize(Roles = "User, Admin")]
    [Route("[controller]")]
    [ApiController]
    public class TaskController(TaskServices taskServices, IConfiguration configuration) : ControllerBase
    {
        [HttpGet]
        [Route("getById/{id}")]
        public async Task<database.Models.Task> GetTask(int id)
        {
            return await taskServices.GetById(id);
        }

        [HttpGet]
        [Route("getByAccount/{accountId}")]
        public async Task<List<database.Models.Task>> GetTasks(int accountId)
        {
            return await taskServices.GetByAccount(accountId);
        }

        [HttpPost]
        [Route("create")]
        public async Task<database.Models.Task> CreateTask(database.Models.Task task)
        {
            return await taskServices.Add(task);
        }

        [HttpPut]
        [Route("update")]
        public async Task UpdateTask(database.Models.Task task)
        {
            await taskServices.Update(task);
            return;
        }

        [HttpDelete]
        [Route("deleteById/{id}")]
        public async Task DeleteTask(int id)
        {
            await taskServices.Delete(id);
            return;
        }

        [HttpDelete]
        [Route("deleteByAccount/{accountId}")]
        public async Task DeleteTaskByAccount(int accountId)
        {
            await taskServices.DeleteMany(accountId);
            return;
        }
    }
}
