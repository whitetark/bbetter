using bbetter.API.Models.Responses;
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

        public async Task<QuotesResponse> GetUserQuotes(int accountId)
        {
            var quotes = await quoteRepository.GetAllByUser(accountId);
            var typesOf = quotes
            .GroupBy(uq => uq.TypeOf)
            .Select(group => new QuoteType
            {
                TypeOf = group.Key,
                Count = group.Count()
            })
            .ToList();

            var result = new QuotesResponse
            {
                Quotes = quotes,
                TypesOf = typesOf,
        };

            return result;
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

