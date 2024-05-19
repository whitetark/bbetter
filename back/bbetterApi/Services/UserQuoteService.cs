using bbetterApi.Clients;
using bbetterApi.Models;
using database.Models;
using database.Repositories;
using Microsoft.AspNetCore.Mvc;
using Task = System.Threading.Tasks.Task;

namespace bbetterApi.Services
{
    public class UserQuoteService(UserQuoteRepository quoteRepository, AccountRepository accountRepository, QuotableClient quotableClient)
    {

        public async Task<List<UserQuote>> GetUserQuotes(int accountId)
        {
            return await quoteRepository.GetAllByUser(accountId);
        }


        public async Task<UserQuote> CreateUserQuote(UserQuote quote)
        {
            return await quoteRepository.Add(quote);
        }

        public async Task UpdateUserQuote(UserQuote quote)
        {
            await quoteRepository.Update(quote);
            return;
        }

        public async Task DeleteUserQuote(int id)
        {
            await quoteRepository.Delete(id);
            return;
        }
    }
}

