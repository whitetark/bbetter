using bbetterApi.Dto;
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
    [Route("[controller]")]
    [ApiController]
    public class AccController(AccService accountServices, QuoteService quoteService, ReflectService reflectService) : ControllerBase
    {
        [Authorize(Roles ="User")]
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

        [Route("deleteById/{id}")]
        [HttpDelete]
        public async Task<ActionResult> DeleteAccount(int id)
        {
            await accountServices.DeleteAccount(id);
            return Ok();
        }

        [Route("update")]
        [HttpPut]
        public async Task<ActionResult> UpdateAccount(AccountUpdateDto updateDto)
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

        [Route("getAccs")]
        [HttpGet]
        public async Task<List<Account>> GetAccounts()
        {
            return await accountServices.GetAccounts();
        }

        [Route("whatToDo")]
        [HttpGet]
        public async Task<WhatToDoResponse> GetWhatToDo([FromQuery] int id)
        {
            return await accountServices.GetWhatToDo(id);
        }

        [Route("getStatistics")]
        [HttpGet]
        public async Task<Statistics> GetStatistics([FromQuery] int id, string type)
        {
            return await accountServices.GetStatistics(id, type);
        }

        [Route("getHomePage")]
        [HttpGet]
        public async Task<ActionResult> GetHomePage([FromQuery] int id, string type)
        {
            var stats = await accountServices.GetStatistics(id, type);
            var quote = await quoteService.GetQuoteOfDay(id.ToString());
            var reflection = await reflectService.GetRecent(id);

            return Ok(new {stats, quote, reflection });
        }
    }
}