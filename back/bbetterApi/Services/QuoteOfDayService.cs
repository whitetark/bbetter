using bbetterApi.Clients;
using bbetterApi.Models;
using database.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace bbetterApi.Services
{
    public class QuoteOfDayService(UserQuoteRepository quoteRepository, AccountRepository accountRepository, QuotableClient quotableClient)
    {
        public async Task<Quote?> GetQuote(string accountId)
        {
            var user = await accountRepository.GetById(accountId);
            var quote = new Quote();

            if (user.isUserQuote)
            {
                if (DateTime.Now > user.QuoteExpires)
                {
                    quote = await GetUserRandomQuote(accountId);
                    quote ??= await GetServiceRandomQuote();
                }
                else
                {
                    quote = await GetUserQuoteById(user.QuoteOfDayId);
                    quote ??= await GetServiceQuoteById(user.QuoteOfDayId);
                }
            }
            else
            {
                if (DateTime.Now > user.QuoteExpires)
                {
                    quote = await GetServiceRandomQuote();
                    quote ??= await GetUserRandomQuote(accountId);
                }
                else
                {
                    quote = await GetServiceQuoteById(user.QuoteOfDayId);
                    quote ??= await GetUserQuoteById(user.QuoteOfDayId);
                }
            }

            if (quote == null)
            {
                return null;
            }

            user.QuoteExpires = DateTime.Now.Date.AddDays(1);
            user.QuoteOfDayId = quote.QuoteId;
            await accountRepository.Update(user);

            return quote;
        }

        private async Task<Quote> GetUserRandomQuote(string accountId)
        {
            var resultDb = await quoteRepository.GetRandom(accountId);
            if (resultDb == null)
            {
                return null;
            }

            return new Quote
            {
                Content = resultDb.Quote,
                Author = resultDb.Author,
                QuoteId = resultDb.UserQuoteId.ToString(),
            };
        }

        private async Task<Quote> GetUserQuoteById(string id)
        {
            var resultDb = await quoteRepository.GetById(id);
            if(resultDb == null)
            {
                return null;
            }

            return new Quote { 
                Content = resultDb.Quote,
                Author = resultDb.Author,
                QuoteId = resultDb.UserQuoteId.ToString(),
            };
        }
        private async Task<Quote> GetServiceRandomQuote()
        {
            return await quotableClient.GetRandomQuote();
        }

        private async Task<Quote> GetServiceQuoteById(string id)
        {
            return await quotableClient.GetQuoteById(id);
        }
    }
}

