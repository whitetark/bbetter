using bbetterApi.Dto;
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
        public async Task<database.Models.Task> CreateTask(TaskAddDto task)
        {
            var userRequest = new database.Models.Task
            {
                AccountId = task.AccountId,
                Content = task.Content,
                IsUrgent = task.IsUrgent,
                IsImportant = task.IsImportant,
                Deadline = task.Deadline,
                IsCompleted = task.IsCompleted,
            };

            return await taskServices.Add(userRequest);
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
