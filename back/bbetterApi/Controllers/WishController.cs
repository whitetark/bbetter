using bbetterApi.Models;
using bbetterApi.Services;
using database.Models;
using database.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Task = System.Threading.Tasks.Task;

namespace bbetterApi.Controllers
{
    [Authorize(Roles = "User, Admin")]
    [Route("[controller]")]
    [ApiController]
    public class WishController(WishService wishServices) : ControllerBase
    {

        [HttpGet]
        [Route("getByAccount")]
        public async Task<ActionResult<List<Wish>>> GetWishes([FromQuery] int accountId)
        {
            return Ok(await wishServices.GetWishes(accountId));
        }

        [HttpGet]
        [Route("getNewWish")]
        public async Task<ActionResult<BoredItem>> GetNewWish()
        {
            return Ok(await wishServices.GetNewWish());
        }

        [HttpPost]
        [Route("create")]
        public async Task<ActionResult<Wish>> CreateWish([FromBody] Wish wish)
        {
            return Ok(await wishServices.CreateWish(wish));
        }

        [HttpPut]
        [Route("update")]
        public async Task<ActionResult> UpdateWish([FromBody] Wish wish)
        {
            await wishServices.UpdateWish(wish);
            return Ok();
        }

        [HttpDelete]
        [Route("deleteById")]
        public async Task<ActionResult> DeleteWish([FromQuery] int id)
        {
            await wishServices.DeleteWish(id);
            return Ok();
        }
    }
}
