using bbetterApi.Clients;
using bbetterApi.Dto;
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
    public class QuoteController(QuoteService quoteServices, IConfiguration configuration) : ControllerBase
    {

        [HttpGet]
        [Route("getQuoteOfDay")]
        public async Task<ActionResult> GetQuoteOfDay([FromQuery(Name = "id")] string id)
        {
            var result = await quoteServices.GetQuoteOfDay(id);
            return Ok(result);
        }

        [HttpGet]
        [Route("getQuoteById")]
        public async Task<Quote> GetQuoteById([FromQuery(Name = "id")] string id)
        {

            return await quoteServices.GetQuoteById(id);
        }

        //UserQuotes
        [HttpGet]
        [Route("user/getById/{id}")]
        public async Task<UserQuote> GetUserQuoteById(int id)
        {
            return await quoteServices.GetUserQuoteById(id);
        }

        [HttpGet]
        [Route("user/getAll/{accountId}")]
        public async Task<List<UserQuote>> GetUserQuotes(int accountId)
        {
            return await quoteServices.GetUserQuotes(accountId);
        }


        [HttpPost]
        [Route("user/create")]
        public async Task<UserQuote> CreateUserQuote(UserQuoteAddDto quote)
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
