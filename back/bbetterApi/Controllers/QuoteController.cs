using bbetterApi.Dto;
using database.Models;
using database.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Task = System.Threading.Tasks.Task;

namespace bbetterApi.Controllers
{
    [Authorize(Roles = "User, Admin")]
    [Route("[controller]")]
    [ApiController]
    public class QuoteController(QuoteServices quoteServices, UserQuoteServices userQuoteServices, IConfiguration configuration) : ControllerBase
    {
        [HttpGet]
        [Route("getAll")]
        public async Task<List<Quote>> GetQuotes()
        {
           return await quoteServices.GetAll();
        }


        [HttpPost]
        [Route("create")]
        public async Task<Quote> CreateQuote(Quote quote)
        {
            return await quoteServices.Add(quote);
        }

        [HttpPut]
        [Route("update")]
        public async Task UpdateQuote(Quote quote)
        {
            await quoteServices.Update(quote);
            return;
        }

        [HttpDelete]
        [Route("deleteById/{id}")]
        public async Task DeleteQuote(int id)
        {
            await quoteServices.Delete(id);
            return;
        }


        //UserQuotes
        [HttpGet]
        [Route("user/getById/{id}")]
        public async Task<UserQuote> GetUserQuoteById(int id)
        {
            return await userQuoteServices.GetById(id);
        }

        [HttpGet]
        [Route("user/getAll/{accountId}")]
        public async Task<List<UserQuote>> GetUserQuotes(int accountId)
        {
            return await userQuoteServices.GetAllByUser(accountId);
        }


        [HttpPost]
        [Route("user/create")]
        public async Task<UserQuote> CreateUserQuote(UserQuoteAddDto quote)
        {
            var userRequest = new UserQuote
            {
                AccountId = quote.AccountId,
                Quote = quote.Quote,
                Author = quote.Author,
            };

            return await userQuoteServices.Add(userRequest);
        }

        [HttpPut]
        [Route("user/update")]
        public async Task UpdateUserQuote(UserQuote quote)
        {
            await userQuoteServices.Update(quote);
            return;
        }

        [HttpDelete]
        [Route("user/deleteById/{id}")]
        public async Task DeleteUserQuote(int id)
        {
            await userQuoteServices.Delete(id);
            return;
        }
    }
}
