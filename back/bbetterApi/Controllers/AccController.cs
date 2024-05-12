﻿using bbetterApi.Dto;
using bbetterApi.Models;
using bbetterApi.Utils;
using database.Models;
using database.Services;
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
    public class AccController(AccountServices accountServices, IConfiguration configuration) : ControllerBase
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

            var user = await accountServices.GetByUsername(username);
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
            await accountServices.Delete(id);
            return Ok();
        }

        [Route("update")]
        [HttpPut]
        public async Task<ActionResult> UpdateAccount(AccountUpdateDto updateDto)
        {
            var responseFromDb = await accountServices.GetByUsername(updateDto.Username);
            if (responseFromDb == null)
            {
                return BadRequest("User not found");
            }

            var newAccount = new Account
            {
                AccountId = updateDto.AccountId,
                Username = updateDto.Username,
                PasswordHash = responseFromDb.PasswordHash,
                RefreshToken = updateDto.RefreshToken,
                TokenCreated = updateDto.TokenCreated,
                TokenExpires = updateDto.TokenExpires,
                QuoteOfDayId = updateDto.QuoteOfDayId,
                QuoteExpires = updateDto.QuoteExpires,
            };

            await accountServices.Update(newAccount);
            return Ok(newAccount);
        }

        [Route("changePassword")]
        [HttpPatch]
        public async Task<ActionResult> ChangePassword([FromBody] UserLoginDto request)
        {
            var responseFromDb = await accountServices.GetByUsername(request.username);

            if (responseFromDb == null)
            {
                return BadRequest("User not found");
            }
            var user = responseFromDb;
            string newPasswordHash = BCrypt.Net.BCrypt.HashPassword(request.password);

            user.PasswordHash = newPasswordHash;
            await accountServices.Update(user);

            return Ok();
        }

        [Route("getAccs")]
        [HttpGet]
        public async Task<List<Account>> GetAccounts()
        {
            return await accountServices.GetAccs();
        }

        [Route("whatToDo")]
        [HttpGet]
        public async Task<WhatToDoResponse> GetWhatToDo([FromQuery] int id)
        {
            var data = await accountServices.GetAllActivities(id);
            return WhatToDoUtil.FormatData(data);
        }
    }
}