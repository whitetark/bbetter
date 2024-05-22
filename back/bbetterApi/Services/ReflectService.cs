using bbetter.API.Clients;
using bbetter.API.Models;
using bbetter.API.Utils;
using bbetterApi.Clients;
using bbetterApi.Utils;
using database.Models;
using database.Repositories;
using Microsoft.AspNetCore.Mvc;
using Task = System.Threading.Tasks.Task;

namespace bbetterApi.Services
{
    public class ReflectService(ReflectionRepository reflectRepository, GPTClient gPTClient)
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

        public async Task<ReflectionStats> GetStats([FromQuery(Name = "id")] int accountId)
        {
            var reflections = await reflectRepository.GetLastMonth(accountId);
            // gpt advice + converter
            var prompt = PromptUtil.TransformReflectionsToString(reflections);
            var advice = await gPTClient.GetReflectionRecommendation(prompt);

            if(advice == null)
            {
                advice = "Not enough data";
            }

            var result = reflections
                .GroupBy(r => r.AccountId)
                .Select(g => new ReflectionStats
                {
                    AccountId = g.Key,
                    Advice = advice,
                    Emotions = g.Select(r => r.Emotion).ToList(),
                    Productivity = g.Select(r => r.Productivity).ToList(),
                    Dates = g.Select(r => r.DateOf).ToList()
                })
                .FirstOrDefault();
            return result;
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
