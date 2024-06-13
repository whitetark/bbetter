using bbetter.API.Models.Responses;
using bbetter.API.Utils;
using database.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace bbetterApi.Services
{
    public class TaskService(TaskRepository taskRepository)
    {
        public async Task<database.Models.Task> GetTask(int id)
        {
            return await taskRepository.GetById(id).ConfigureAwait(false);
        }

        public async Task<TaskResponse> GetTasks(int accountId)
        {
            var tasks = await taskRepository.GetByAccount(accountId).ConfigureAwait(false);
            return TaskStatsUtil.FormTaskResponse(tasks);
        }

        public async Task<database.Models.Task> CreateTask(database.Models.Task task)
        {
            return await taskRepository.Add(task).ConfigureAwait(false);
        }

        public async Task UpdateTask(database.Models.Task task)
        {
            await taskRepository.Update(task).ConfigureAwait(false);
            return;
        }


        public async Task DeleteTask(int id)
        {
            await taskRepository.Delete(id).ConfigureAwait(false);
            return;
        }

        public async Task DeleteTaskByAccount(int accountId)
        {
            await taskRepository.DeleteMany(accountId).ConfigureAwait(false);
            return;
        }
    }
}
