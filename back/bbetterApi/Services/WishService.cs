using database.Models;
using database.Repositories;
using Microsoft.AspNetCore.Mvc;
using Task = System.Threading.Tasks.Task;

namespace bbetterApi.Services
{
    public class WishService(WishRepository wishRepository)
    {
        public async Task<Wish> GetWish(int id)
        {
            return await wishRepository.GetById(id);
        }


        public async Task<List<Wish>> GetWishes(int accountId)
        {
            return await wishRepository.GetByAccount(accountId);
        }


        public async Task<Wish> CreateWish(Wish wish)
        {
            var userRequest = new Wish
            {
                AccountId = wish.AccountId,
                Content = wish.Content,
                IsCompleted = wish.IsCompleted,
            };

            return await wishRepository.Add(userRequest);
        }


        public async Task UpdateWish(Wish wish)
        {
            await wishRepository.Update(wish);
            return;
        }


        public async Task DeleteWish(int id)
        {
            await wishRepository.Delete(id);
            return;
        }


        public async Task DeleteWishesByAccount(int accountId)
        {
            await wishRepository.DeleteMany(accountId);
            return;
        }
    }
}
