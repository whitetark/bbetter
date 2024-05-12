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
    public class ReflectController(ReflectionServices reflectionServices, IConfiguration configuration)
    {
        [HttpGet]
        [Route("getById/{id}")]
        public async Task<Reflection> GetReflection(int id)
        {
            return await reflectionServices.GetById(id);
        }

        [HttpGet]
        [Route("getByAccount/{accountId}")]
        public async Task<List<Reflection>> GetReflections(int accountId)
        {
            return await reflectionServices.GetByAccount(accountId);
        }

        [HttpGet]
        [Route("checkForToday")]
        public async Task<bool> CheckForToday([FromQuery(Name ="id")] int accountId)
        {
            return await reflectionServices.CheckToday(accountId);
        }

        [HttpPost]
        [Route("create")]
        public async Task<Reflection> CreateReflection(Reflection reflection)
        {
            return await reflectionServices.Add(reflection);
        }

        [HttpPut]
        [Route("update")]
        public async Task UpdateReflection(Reflection task)
        {
            await reflectionServices.Update(task);
            return;
        }

        [HttpDelete]
        [Route("deleteById/{id}")]
        public async Task DeleteTask(int id)
        {
            await reflectionServices.Delete(id);
            return;
        }

        [HttpDelete]
        [Route("deleteByAccount/{accountId}")]
        public async Task DeleteTaskByAccount(int accountId)
        {
            await reflectionServices.DeleteMany(accountId);
            return;
        }
    }
}
