using Microsoft.AspNetCore.Mvc;

namespace ReactApp2.Server.Services.Interfaces
{
    public interface ITodoService
    {

        List<Todo> GetAll();
        Todo Get(string id);
        string Create(Todo value);
        Todo Update(Todo value);
        string Delete(string id);
    }
}
