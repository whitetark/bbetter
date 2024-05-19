using bbetterApi.Dto;
using bbetterApi.Services;
using database.Models;
using database.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Task = System.Threading.Tasks.Task;

namespace bbetterApi.Controllers
{
    [Authorize(Roles = "User, Admin")]
    [Route("[controller]")]
    [ApiController]
    public class WishController(WishService wishServices) : ControllerBase
    {
        [HttpGet]
        [Route("getById/{id}")]
        public async Task<Wish> GetWish(int id)
        {
            return await wishServices.GetWish(id);
        }

        [HttpGet]
        [Route("getByAccount/{accountId}")]
        public async Task<List<Wish>> GetWishes(int accountId)
        {
            return await wishServices.GetWishes(accountId);
        }

        [HttpPost]
        [Route("create")]
        public async Task<Wish> CreateWish(Wish wish)
        {
            return await wishServices.CreateWish(wish);
        }

        [HttpPut]
        [Route("update")]
        public async Task UpdateWish(Wish wish)
        {
            await wishServices.UpdateWish(wish);
            return;
        }

        [HttpDelete]
        [Route("deleteById/{id}")]
        public async Task DeleteWish(int id)
        {
            await wishServices.DeleteWish(id);
            return;
        }

        [HttpDelete]
        [Route("deleteByAccount/{accountId}")]
        public async Task DeleteWishesByAccount(int accountId)
        {
            await wishServices.DeleteWishesByAccount(accountId);
            return;
        }
    }
}
