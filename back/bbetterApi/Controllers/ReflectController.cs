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
    public class ReflectController(ReflectService reflectionServices, IConfiguration configuration)
    {
        [HttpGet]
        [Route("getById/{id}")]
        public async Task<Reflection> GetReflection(int id)
        {
            return await reflectionServices.GetReflection(id);
        }

        [HttpGet]
        [Route("getByAccount/{accountId}")]
        public async Task<List<Reflection>> GetReflections(int accountId)
        {
            return await reflectionServices.GetReflections(accountId);
        }

        [HttpGet]
        [Route("getByMonth")]
        public async Task<List<Reflection>> GetDatesByMonth([FromQuery(Name ="id")] int accountId, [FromQuery(Name = "month")] int month, [FromQuery(Name = "year")] int year)
        {
            return await reflectionServices.GetDatesByMonth(accountId, month, year);
        }

        [HttpGet]
        [Route("checkForToday")]
        public async Task<bool> CheckForToday([FromQuery(Name ="id")] int accountId)
        {
            return await reflectionServices.CheckForToday(accountId);
        }

        [HttpPost]
        [Route("create")]
        public async Task<Reflection> CreateReflection(Reflection reflection)
        {
            return await reflectionServices.CreateReflection(reflection);
        }

        [HttpPut]
        [Route("update")]
        public async Task UpdateReflection(Reflection task)
        {
            await reflectionServices.UpdateReflection(task);
            return;
        }

        [HttpDelete]
        [Route("deleteById/{id}")]
        public async Task DeleteReflection(int id)
        {
            await reflectionServices.DeleteReflection(id);
            return;
        }

        [HttpDelete]
        [Route("deleteByAccount/{accountId}")]
        public async Task DeleteReflectionsByAccount(int accountId)
        {
            await reflectionServices.DeleteReflectionsByAccount(accountId);
            return;
        }
    }
}
