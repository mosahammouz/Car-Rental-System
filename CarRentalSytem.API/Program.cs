using CarRentalSystem.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<CarRentalDbContext>(options =>  // added it on DI container
    options.UseSqlServer( builder.Configuration.GetConnectionString("DefaultConnection")));


var app = builder.Build();
app.MapGet("/", () => "hello world");
app.Run();