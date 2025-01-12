namespace ReactApp2.Server.Data
{
    public class TodoData
    {
        public List<Todo> Todos { get; set; }
        public TodoData()
        {
            Todos = new List<Todo>();
        }
    }
}
