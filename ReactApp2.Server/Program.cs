using ReactApp2.Server.Data;
using ReactApp2.Server.Services;
using ReactApp2.Server.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// ����������� ������������
builder.Services.AddSingleton<TodoData>();
builder.Services.AddScoped<ITodoService, TodoService>();

// �������� ������ �������
builder.Services.AddControllers();

var app = builder.Build();

// ������������ HTTP-��������
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.UseCors(x =>
{
    x.WithHeaders().AllowAnyHeader();
    x.WithOrigins("http://localhost:3000");
    x.WithMethods().AllowAnyMethod();
});
app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");
app.MapFallbackToFile("/index.html");
app.Run();
