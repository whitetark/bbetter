using bbetterApi.Clients;
using database.Models;
using database.Repositories;
using Microsoft.AspNetCore.Mvc;
using Task = System.Threading.Tasks.Task;

namespace bbetterApi.Services
{
    public class ReflectService(ReflectionRepository reflectRepository)
    {
        public async Task<Reflection> GetReflection(int id)
        {
            return await reflectRepository.GetById(id);
        }

        public async Task<List<Reflection>> GetReflections(int accountId)
        {
            return await reflectRepository.GetByAccount(accountId);
        }

        public async Task<List<Reflection>> GetDatesByMonth(int accountId, int month, int year)
        {
            return await reflectRepository.GetByMonth(accountId, month, year);
        }

        public async Task<Reflection> GetRecent(int accountId)
        {
            return await reflectRepository.GetRecent(accountId);
        }
        public async Task<bool> CheckForToday(int accountId)
        {
            return await reflectRepository.CheckToday(accountId);
        }

        public async Task<Reflection> CreateReflection(Reflection reflection)
        {
            return await reflectRepository.Add(reflection);
        }

        public async Task UpdateReflection(Reflection task)
        {
            await reflectRepository.Update(task);
            return;
        }

        public async Task DeleteReflection(int id)
        {
            await reflectRepository.Delete(id);
            return;
        }

        public async Task DeleteReflectionsByAccount(int accountId)
        {
            await reflectRepository.DeleteMany(accountId);
            return;
        }
    }
}
