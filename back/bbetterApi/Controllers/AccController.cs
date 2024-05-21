using bbetterApi.Models;
using bbetterApi.Services;
using bbetterApi.Utils;
using database.Models;
using database.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Task = System.Threading.Tasks.Task;

namespace bbetterApi.Controllers
{
    [Authorize(Roles = "User, Admin")]
    [Route("[controller]")]
    [ApiController]
    public class AccController(AccService accountServices, QuoteOfDayService quoteOfDayService, ReflectService reflectService) : ControllerBase
    {
        [Route("getByUsername")]
        [HttpGet]
        public async Task<ActionResult> GetAccount()
        {
            var username = Request.Cookies["username"];
            if (username == null)
            {
                return BadRequest("No username cookie");
            }

            var user = await accountServices.GetAccount(username);
            if (user == null)
            {
                return BadRequest("User not found");
            }

            return Ok(user);
        }
        [Route("deleteById")]
        [HttpDelete]
        public async Task<ActionResult> DeleteAccount([FromQuery] int id)
        {
            await accountServices.DeleteAccount(id);
            return Ok();
        }

        [Route("update")]
        [HttpPut]
        public async Task<ActionResult> UpdateAccount([FromBody] Account updateDto)
        {
          
            var result = await accountServices.UpdateAccount(updateDto);

            if (result == null)
            {
                return BadRequest("User not found");
            }

            return Ok(result);
        }

        [Route("changePassword")]
        [HttpPatch]
        public async Task<ActionResult> ChangePassword([FromBody] UserLoginDto request)
        {
            await accountServices.ChangePassword(request);
            return Ok();
        }

        [AllowAnonymous]
        [Route("whatToDo")]
        [HttpGet]
        public async Task<ActionResult<WhatToDoResponse>> GetWhatToDo([FromQuery] int id)
        {
            return Ok(await accountServices.GetWhatToDo(id));
        }

        [Route("getStatistics")]
        [HttpGet]
        public async Task<ActionResult<Statistics>> GetStatistics([FromQuery] int id, string type)
        {
            return Ok(await accountServices.GetStatistics(id, type));
        }

        [Route("getQuoteOfTheDay")]
        [HttpGet]
        public async Task<ActionResult<Quote>> GetRandomQuote([FromQuery] int id)
        {
            return Ok(await quoteOfDayService.GetQuote(id.ToString()));
        }

        [Route("getRecentReflection")]
        [HttpGet]
        public async Task<ActionResult<Reflection>> GetRecentReflection([FromQuery] int id)
        {
            return Ok(await reflectService.GetRecent(id));
        }
    }
}