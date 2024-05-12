using bbetterApi.Clients;
using bbetterApi.Dto;
using bbetterApi.Models;
using database.Models;
using database.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Task = System.Threading.Tasks.Task;

namespace bbetterApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class QuoteController(QuotableClient quotableClient, AccountServices accountServices, UserQuoteServices userQuoteServices, IConfiguration configuration) : ControllerBase
    {

        [HttpGet]
        [Route("getQuoteOfDay")]
        public async Task<ActionResult> GetQuoteOfDay([FromQuery(Name = "id")] string id)
        {
            var user = await accountServices.GetById(id);
            var result = new Quote();

            if (DateTime.Now > user.QuoteExpires)
            {
                result = await quotableClient.GetRandomQuote();
                user.QuoteExpires = DateTime.Now.Date.AddDays(1);
                user.QuoteOfDayId = result.QuoteId;
                await accountServices.Update(user);
            }
            else
            {
                result = await quotableClient.GetQuoteById(user.QuoteOfDayId);
            }

            return Ok(result);
        }

        [HttpGet]
        [Route("getQuoteById")]
        public async Task<Quote> GetQuoteById([FromQuery(Name = "id")] string id)
        {

            return await quotableClient.GetQuoteById(id);
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
