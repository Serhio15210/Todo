using Microsoft.AspNetCore.Mvc;
using ReactApp2.Server.Services.Interfaces;

namespace ReactApp2.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TodosController : ControllerBase
    {
        private readonly ITodoService _todoService;
        private readonly ILogger<TodosController> _logger;

        public TodosController(ITodoService todoService, ILogger<TodosController> logger)
        {
            _todoService = todoService;
            _logger = logger;
        }
        
        [HttpGet]
        public IEnumerable<Todo> Get()
        {
            return _todoService.GetAll().ToArray() ?? [];
        }
        [HttpGet("{id}")]
        public ActionResult<Todo> Get(string id)
        {
            var todo = _todoService.Get(id);
            if (todo == null)
            {
                return NotFound();
            }
            return Ok(todo);
        }
        [HttpPost("create")]
        public ActionResult<string> Post([FromBody] Todo value)
        {
            if (value == null || string.IsNullOrEmpty(value.Title) || value.Date == default)
            {
                return BadRequest("Invalid data.");
            }

            var result = _todoService.Create(value);
            return Ok(result);
        }
        
        [HttpPut("{id}")]
        public ActionResult Put([FromBody] Todo value)
        {
            var updatedTodo = _todoService.Update(value);
            if (updatedTodo == null)
            {
                return NotFound();
            }

            return NoContent();
        }

        // DELETE api/<TodosController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            _todoService.Delete(id);
            return NoContent();
        }
    }
}
