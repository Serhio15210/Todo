using ReactApp2.Server.Data;
using ReactApp2.Server.Services.Interfaces;

namespace ReactApp2.Server.Services
{
    public class TodoService : ITodoService
    {
        private TodoData _todoData;
        public TodoService(TodoData todoData)
        {
            _todoData = todoData;
        }

        public string Create(Todo value)
        {
            value.Id = Guid.NewGuid().ToString();
            _todoData.Todos.Add(value);
            return value.Id;
        }

        public string Delete(string id)
        {
            var todo = _todoData.Todos.FirstOrDefault(t => t.Id == id);
            if (todo != null)
            {
                _todoData.Todos.Remove(todo);
                return id;
            }
            return null;
        }

        public List<Todo> GetAll()
        {
            return _todoData.Todos;
        }

        public Todo Get(string id)
        {
            return !string.IsNullOrEmpty(id) ? _todoData.Todos.FirstOrDefault(t => t.Id == id) : null;
        }

        public Todo Update(Todo value)
        {
            var todo = _todoData.Todos.FirstOrDefault(t => t.Id == value.Id);
            if (todo != null)
            {
                todo.Date = value.Date;
                todo.Title = value.Title;
                todo.Text = value.Text;
                todo.Checked = value.Checked;
            }
            return todo;
        }
    }
}
