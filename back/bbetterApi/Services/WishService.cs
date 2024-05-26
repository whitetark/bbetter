using bbetter.API.Models.Clients;
using bbetterApi.Clients;
using database.Models;
using database.Repositories;
using Microsoft.AspNetCore.Mvc;
using Task = System.Threading.Tasks.Task;

namespace bbetterApi.Services
{
    public class WishService(WishRepository wishRepository, BoredClient boredClient)
    {
        public async Task<Wish> GetWish(int id)
        {
            return await wishRepository.GetById(id).ConfigureAwait(false);
        }


        public async Task<List<Wish>> GetWishes(int accountId)
        {
            return await wishRepository.GetByAccount(accountId).ConfigureAwait(false);
        }

        public async Task<BoredItem> GetNewWish()
        {
            return await boredClient.GetRandomActivity().ConfigureAwait(false);
        }

        public async Task<Wish> CreateWish(Wish wish)
        {
            return await wishRepository.Add(wish).ConfigureAwait(false);
        }


        public async Task UpdateWish(Wish wish)
        {
            await wishRepository.Update(wish).ConfigureAwait(false);
            return;
        }


        public async Task DeleteWish(int id)
        {
            await wishRepository.Delete(id).ConfigureAwait(false);
            return;
        }


        public async Task DeleteWishesByAccount(int accountId)
        {
            await wishRepository.DeleteMany(accountId).ConfigureAwait(false);
            return;
        }
    }
}
