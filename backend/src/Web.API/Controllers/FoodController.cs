using Application.Common.Models;
using Application.FoodServices.Commands.CreateFood;
using Application.FoodServices.Commands.DeleteFood;
using Application.FoodServices.Commands.UpdateFood;
using Application.FoodServices.Queries.GetFoods;
using Application.FoodServices.Queries.GetFoodsWithPaginationQuery;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Web.API.Controllers
{
    [AllowAnonymous]
    public class FoodController : ApiController
    {
        [HttpGet]
        public async Task<ActionResult<PaginatedList<FoodDto>>> GetFoodsWithPagination([FromQuery] GetFoodsWithPaginationQuery query)
        {
            return await Mediator.Send(query);
        }

        [HttpPost]
        public async Task<ActionResult<int>> Create(CreateFoodCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, UpdateFoodCommand command)
        {
            if (id != command.Id)
            {
                return BadRequest();
            }

            await Mediator.Send(command);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await Mediator.Send(new DeleteFoodCommand { Id = id });

            return NoContent();
        }
    }
}
