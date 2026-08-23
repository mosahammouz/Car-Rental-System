using System.Text;
using CarRentalSystem.Application.Configuration;
using CarRentalSystem.Application.Interfaces.Repositories;
using CarRentalSystem.Application.Interfaces.Services;
using CarRentalSystem.Application.Services;
using CarRentalSystem.Infrastructure.Data;
using CarRentalSystem.Infrastructure.Repositories;
using CarRentalSytem.API.Endpoints;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Register to di container
builder.Services.AddDbContext<CarRentalDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.Configure<JwtSettings>(
    builder.Configuration.GetSection("Jwt"));


var jwtSettings = builder.Configuration
    .GetSection("Jwt")
    .Get<JwtSettings>();

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,

            ValidIssuer = jwtSettings!.Issuer,
            ValidAudience = jwtSettings.Audience,

            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwtSettings.Key))
        };
    });


builder.Services.AddAuthorization();

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();


app.MapAuthEndpoints();

app.MapGet("/", () => "hello world");
app.MapGet("/api/test", () =>
    {
        return Results.Ok("You are authenticated!");
    })
    .RequireAuthorization();
app.Run();