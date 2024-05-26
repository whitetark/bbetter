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
            var user = await accountRepository.GetById(accountId).ConfigureAwait(false);
            var quote = new Quote();

            if (user.isUserQuote)
            {
                if (DateTime.Now > user.QuoteExpires)
                {
                    quote = await GetUserRandomQuote(accountId).ConfigureAwait(false);
                    quote ??= await GetServiceRandomQuote().ConfigureAwait(false);
                }
                else
                {
                    quote = await GetUserQuoteById(user.QuoteOfDayId).ConfigureAwait(false);
                    quote ??= await GetServiceQuoteById(user.QuoteOfDayId).ConfigureAwait(false);
                }
            }
            else
            {
                if (DateTime.Now > user.QuoteExpires)
                {
                    quote = await GetServiceRandomQuote().ConfigureAwait(false);
                    quote ??= await GetUserRandomQuote(accountId).ConfigureAwait(false);
                }
                else
                {
                    quote = await GetServiceQuoteById(user.QuoteOfDayId).ConfigureAwait(false);
                    quote ??= await GetUserQuoteById(user.QuoteOfDayId).ConfigureAwait(false);
                }
            }

            if (quote == null)
            {
                return null;
            }

            user.QuoteExpires = DateTime.Now.Date.AddDays(1);
            user.QuoteOfDayId = quote.QuoteId;
            await accountRepository.Update(user).ConfigureAwait(false);

            return quote;
        }

        private async Task<Quote> GetUserRandomQuote(string accountId)
        {
            var resultDb = await quoteRepository.GetRandom(accountId).ConfigureAwait(false);
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
            var resultDb = await quoteRepository.GetById(id).ConfigureAwait(false);
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
            return await quotableClient.GetRandomQuote().ConfigureAwait(false);
        }

        private async Task<Quote> GetServiceQuoteById(string id)
        {
            return await quotableClient.GetQuoteById(id).ConfigureAwait(false);
        }
    }
}

