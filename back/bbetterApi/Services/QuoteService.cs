using bbetterApi.Clients;
using bbetterApi.Dto;
using bbetterApi.Models;
using database.Models;
using database.Repositories;
using Microsoft.AspNetCore.Mvc;
using Task = System.Threading.Tasks.Task;

namespace bbetterApi.Services
{
    public class QuoteService(UserQuoteRepository quoteRepository, AccountRepository accountRepository, QuotableClient quotableClient)
    {
        public async Task<Quote> GetQuoteOfDay(string id)
        {
            var user = await accountRepository.GetById(id);
            var result = new Quote();

            if (DateTime.Now > user.QuoteExpires)
            {
                result = await quotableClient.GetRandomQuote();
                user.QuoteExpires = DateTime.Now.Date.AddDays(1);
                user.QuoteOfDayId = result.QuoteId;
                await accountRepository.Update(user);
            }
            else
            {
                result = await quotableClient.GetQuoteById(user.QuoteOfDayId);
            }

            return result;
        }

        public async Task<Quote> GetQuoteById( string id)
        {
            return await quotableClient.GetQuoteById(id);
        }

        //UserQuotes
        public async Task<UserQuote> GetUserQuoteById(int id)
        {
            return await quoteRepository.GetById(id);
        }

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
