using CarRentalSystem.Application.Interfaces.Repositories;
using CarRentalSystem.Application.Interfaces.Services;
using CarRentalSystem.Application.Services;
using CarRentalSystem.Infrastructure.Data;
using CarRentalSystem.Infrastructure.Repositories;
using CarRentalSytem.API.Endpoints;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Register DbContext to the Di container
builder.Services.AddDbContext<CarRentalDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")));

// Register repositories to the Di container
builder.Services.AddScoped<IUserRepository, UserRepository>();

// Register application services to the Di container
builder.Services.AddScoped<IAuthService, AuthService>();

var app = builder.Build();

// Map endpoints
app.MapAuthEndpoints();

app.MapGet("/", () => "hello world");

app.Run();