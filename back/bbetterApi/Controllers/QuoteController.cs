using bbetterApi.Clients;
using bbetterApi.Dto;
using bbetterApi.Middleware;
using bbetterApi.Models;
using bbetterApi.Services;
using database.Models;
using database.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Task = System.Threading.Tasks.Task;

namespace bbetterApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class QuoteController(UserQuoteService quoteServices) : ControllerBase
    {
        //UserQuotes

        [HttpGet]
        [Route("user/getAll/{accountId}")]
        public async Task<List<UserQuote>> GetUserQuotes(int accountId)
        {
            return await quoteServices.GetUserQuotes(accountId);
        }


        [HttpPost]
        [Route("user/create")]
        public async Task<UserQuote> CreateUserQuote(UserQuote quote)
        {
            return await quoteServices.CreateUserQuote(quote);
        }

        [HttpPut]
        [Route("user/update")]
        public async Task UpdateUserQuote(UserQuote quote)
        {
            await quoteServices.UpdateUserQuote(quote);
            return;
        }

        [HttpDelete]
        [Route("user/deleteById/{id}")]
        public async Task DeleteUserQuote(int id)
        {
            await quoteServices.DeleteUserQuote(id);
            return;
        }
    }
}
