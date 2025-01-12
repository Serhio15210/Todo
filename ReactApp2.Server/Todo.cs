namespace ReactApp2.Server
{
    public class Todo
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public required string Date { get; set; }
        public required string Title { get; set; }
        public string? Text { get; set; }
        public bool? Checked { get; set; } = false; 
    }
}
