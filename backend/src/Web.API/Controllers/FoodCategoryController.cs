using Application.Common.Models;
using Application.FoodCategoryServices.Commands.CreateFoodCategory;
using Application.FoodCategoryServices.Commands.DeleteFoodCategory;
using Application.FoodCategoryServices.Commands.UpdateFoodCategory;
using Application.FoodCategoryServices.Queries.GetFoodCategories;
using Application.FoodCategoryServices.Queries.GetFoodCategoriesWithPagination;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Web.API.Controllers
{
    [AllowAnonymous]
    public class FoodCategoryController : ApiController
    {
        [HttpGet]
        public async Task<ActionResult<PaginatedList<FoodCategoryDto>>> GetFoodCategorysWithPagination([FromQuery] GetFoodCategoriesWithPaginationQuery query)
        {
            return await Mediator.Send(query);
        }

        [HttpPost]
        public async Task<ActionResult<int>> Create(CreateFoodCategoryCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, UpdateFoodCategoryCommand command)
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
            await Mediator.Send(new DeleteFoodCategoryCommand { Id = id });

            return NoContent();
        }
    }
}
