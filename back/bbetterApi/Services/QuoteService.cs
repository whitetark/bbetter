using bbetterApi.Clients;
using bbetterApi.Dto;
using bbetterApi.Models;
using database.Models;
using database.Repositories;
using Microsoft.AspNetCore.Mvc;
using Task = System.Threading.Tasks.Task;

namespace bbetterApi.Services
{
    public class QuoteService
    {
        private readonly UserQuoteRepository quoteRepository;
        private readonly AccountRepository accountRepository;
        private readonly QuotableClient quotableClient;
        public QuoteService(UserQuoteRepository quoteRepository, AccountRepository accountRepository, QuotableClient quotableClient)
        {
           this.quoteRepository = quoteRepository;
           this.quotableClient = quotableClient;
        }

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


        public async Task<UserQuote> CreateUserQuote(UserQuoteAddDto quote)
        {
            var userRequest = new UserQuote
            {
                AccountId = quote.AccountId,
                Quote = quote.Quote,
                Author = quote.Author,
            };

            return await quoteRepository.Add(userRequest);
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
