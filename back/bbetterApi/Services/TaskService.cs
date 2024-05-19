using database.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace bbetterApi.Services
{
    public class TaskService(TaskRepository taskRepository)
    {
        public async Task<database.Models.Task> GetTask(int id)
        {
            return await taskRepository.GetById(id);
        }

        public async Task<List<database.Models.Task>> GetTasks(int accountId)
        {
            return await taskRepository.GetByAccount(accountId);
        }

        public async Task<database.Models.Task> CreateTask(database.Models.Task task)
        {
            return await taskRepository.Add(task);
        }

        public async Task UpdateTask(database.Models.Task task)
        {
            await taskRepository.Update(task);
            return;
        }


        public async Task DeleteTask(int id)
        {
            await taskRepository.Delete(id);
            return;
        }

        public async Task DeleteTaskByAccount(int accountId)
        {
            await taskRepository.DeleteMany(accountId);
            return;
        }
    }
}
