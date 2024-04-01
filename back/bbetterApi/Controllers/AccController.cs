using bbetterApi.Models;
using database.Models;
using database.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace bbetterApi.Controllers
{
    [Authorize(Roles = "User, Admin")]
    [Route("[controller]")]
    [ApiController]
    public class AccController(AccountServices accountServices, IConfiguration configuration) : ControllerBase
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

            var user = await accountServices.GetAccountByUsername(username);
            if (user == null)
            {
                return BadRequest("User not found");
            }

            return Ok(user);
        }

        [Route("deleteById/{id}")]
        [HttpDelete]
        public async Task<ActionResult> DeleteAccount(string id)
        {
            await accountServices.DeleteAccount(id);
            return Ok();
        }

        [Route("update")]
        [HttpPut]
        public async Task<ActionResult> UpdateAccount(AccountUpdateDto updateDto)
        {
            var responseFromDb = await accountServices.GetAccountByUsername(updateDto.Username);
            if (responseFromDb == null)
            {
                return BadRequest("User not found");
            }

            var newAccount = new Account
            {
                AccountId = updateDto.Id,
                Username = updateDto.Username,
                PasswordHash = responseFromDb.PasswordHash,
                RefreshToken = updateDto.RefreshToken,
                TokenCreated = updateDto.TokenCreated,
                TokenExpires = updateDto.TokenExpires,
            };

            await accountServices.UpdateAccount(newAccount);
            return Ok(newAccount);
        }

        [Route("changePassword")]
        [HttpPatch]
        public async Task<ActionResult> ChangePassword([FromBody] UserDto request)
        {
            var responseFromDb = await accountServices.GetAccountByUsername(request.username);

            if (responseFromDb == null)
            {
                return BadRequest("User not found");
            }
            var user = responseFromDb;
            string newPasswordHash = BCrypt.Net.BCrypt.HashPassword(request.password);

            user.PasswordHash = newPasswordHash;
            await accountServices.UpdateAccount(user);

            return Ok();
        }
    }
}