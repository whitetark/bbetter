using bbetterApi.Dto;
using database.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace bbetterApi.Services
{
    public class TaskService
    {
        private readonly TaskRepository taskRepository;

        public TaskService(TaskRepository taskRepository)
        {
            this.taskRepository = taskRepository;
        }

        public async Task<database.Models.Task> GetTask(int id)
        {
            return await taskRepository.GetById(id);
        }

        public async Task<List<database.Models.Task>> GetTasks(int accountId)
        {
            return await taskRepository.GetByAccount(accountId);
        }

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

            return await taskRepository.Add(userRequest);
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
