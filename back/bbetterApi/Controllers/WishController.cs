using bbetterApi.Dto;
using database.Models;
using database.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Task = System.Threading.Tasks.Task;

namespace bbetterApi.Controllers
{
    [Authorize(Roles = "User, Admin")]
    [Route("[controller]")]
    [ApiController]
    public class WishController(WishServices wishServices, IConfiguration configuration) : ControllerBase
    {
        [HttpGet]
        [Route("getById/{id}")]
        public async Task<Wish> GetWish(int id)
        {
            return await wishServices.GetById(id);
        }

        [HttpGet]
        [Route("getByAccount/{accountId}")]
        public async Task<List<Wish>> GetWishes(int accountId)
        {
            return await wishServices.GetByAccount(accountId);
        }

        [HttpPost]
        [Route("create")]
        public async Task<Wish> CreateWish(WishAddDto wish)
        {
            var userRequest = new Wish
            {
                AccountId = wish.AccountId,
                Content = wish.Content,
                IsCompleted = wish.IsCompleted,
            };

            return await wishServices.Add(userRequest);
        }

        [HttpPut]
        [Route("update")]
        public async Task UpdateWish(Wish wish)
        {
            await wishServices.Update(wish);
            return;
        }

        [HttpDelete]
        [Route("deleteById/{id}")]
        public async Task DeleteWish(int id)
        {
            await wishServices.Delete(id);
            return;
        }

        [HttpDelete]
        [Route("deleteByAccount/{accountId}")]
        public async Task DeleteWishesByAccount(int accountId)
        {
            await wishServices.DeleteMany(accountId);
            return;
        }
    }
}
