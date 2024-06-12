using bbetter.API.Clients;
using bbetter.API.Models.Stats;
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
            return await reflectRepository.GetById(id).ConfigureAwait(false);
        }

        public async Task<List<Reflection>> GetReflections(int accountId)
        {
            return await reflectRepository.GetByAccount(accountId).ConfigureAwait(false);
        }

        public async Task<List<Reflection>> GetDatesByMonth(int accountId, int month, int year)
        {
            return await reflectRepository.GetByMonth(accountId, month, year).ConfigureAwait(false);
        }

        public async Task<ReflectionStats> GetStats([FromQuery(Name = "id")] int accountId)
        {
            var reflections = await reflectRepository.GetLastMonth(accountId).ConfigureAwait(false);
            // gpt advice + converter
            var prompt = PromptUtil.TransformReflectionsToString(reflections);
            var advice = await gPTClient.GetReflectionRecommendation(prompt).ConfigureAwait(false);

            if(advice == null)
            {
                advice = "Try to do something you always want, because you emotion is much lower than productivity";
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
            return await reflectRepository.GetRecent(accountId).ConfigureAwait(false);
        }
        public async Task<bool> CheckForToday(int accountId)
        {
            return await reflectRepository.CheckToday(accountId).ConfigureAwait(false);
        }

        public async Task<Reflection> CreateReflection(Reflection reflection)
        {
            return await reflectRepository.Add(reflection).ConfigureAwait(false);
        }

        public async Task UpdateReflection(Reflection task)
        {
            await reflectRepository.Update(task).ConfigureAwait(false);
            return;
        }

        public async Task DeleteReflection(int id)
        {
            await reflectRepository.Delete(id).ConfigureAwait(false);
            return;
        }

        public async Task DeleteReflectionsByAccount(int accountId)
        {
            await reflectRepository.DeleteMany(accountId).ConfigureAwait(false);
            return;
        }
    }
}
