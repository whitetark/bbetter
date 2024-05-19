﻿using bbetterApi.Services;
using database.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Task = System.Threading.Tasks.Task;

namespace bbetterApi.Controllers
{
    [Authorize(Roles = "User, Admin")]
    [Route("[controller]")]
    [ApiController]
    public class QuoteController(UserQuoteService quoteServices) : ControllerBase
    {
        //UserQuotes

        [HttpGet]
        [Route("user/getAll")]
        public async Task<ActionResult<List<UserQuote>>> GetUserQuotes([FromQuery] int accountId)
        {
            return Ok(await quoteServices.GetUserQuotes(accountId));
        }


        [HttpPost]
        [Route("user/create")]
        public async Task<ActionResult<UserQuote>> CreateUserQuote([FromBody] UserQuote quote)
        {
            return Ok(await quoteServices.CreateUserQuote(quote));
        }

        [HttpPut]
        [Route("user/update")]
        public async Task<ActionResult> UpdateUserQuote([FromBody] UserQuote quote)
        {
            await quoteServices.UpdateUserQuote(quote);
            return Ok();
        }

        [HttpDelete]
        [Route("user/deleteById")]
        public async Task<ActionResult> DeleteUserQuote([FromQuery] int id)
        {
            await quoteServices.DeleteUserQuote(id);
            return Ok();
        }
    }
}
