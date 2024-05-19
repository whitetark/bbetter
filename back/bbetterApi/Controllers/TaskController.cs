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
    public class TaskController(TaskService taskServices) : ControllerBase
    {
        [HttpGet]
        [Route("getById/{id}")]
        public async Task<database.Models.Task> GetTask(int id)
        {
            return await taskServices.GetTask(id);
        }

        [HttpGet]
        [Route("getByAccount/{accountId}")]
        public async Task<List<database.Models.Task>> GetTasks(int accountId)
        {
            return await taskServices.GetTasks(accountId);
        }

        [HttpPost]
        [Route("create")]
        public async Task<database.Models.Task> CreateTask(database.Models.Task task)
        {

            return await taskServices.CreateTask(task);
        }

        [HttpPut]
        [Route("update")]
        public async Task UpdateTask(database.Models.Task task)
        {
            await taskServices.UpdateTask(task);
            return;
        }

        [HttpDelete]
        [Route("deleteById/{id}")]
        public async Task DeleteTask(int id)
        {
            await taskServices.DeleteTask(id);
            return;
        }

        [HttpDelete]
        [Route("deleteByAccount/{accountId}")]
        public async Task DeleteTaskByAccount(int accountId)
        {
            await taskServices.DeleteTaskByAccount(accountId);
            return;
        }
    }
}
