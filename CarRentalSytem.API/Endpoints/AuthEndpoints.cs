using CarRentalSystem.Application.DTOs.Auth;
using CarRentalSystem.Application.Interfaces.Services;

namespace CarRentalSytem.API.Endpoints;
public static class AuthEndpoints
{
    public static void MapAuthEndpoints(this WebApplication app)
    {
        var auth = app.MapGroup("/api/auth");

        auth.MapPost("/register", async (RegisterRequest request, IAuthService authService) =>
        {
            await authService.RegisterAsync(request);

            return Results.Ok(new
            {
                message = "User registered successfully."
            });
        });

        auth.MapPost("/login", async (
            LoginRequest request,
            IAuthService authService) =>
        {
            try
            {
                var response = await authService.LoginAsync(request); // login response type contains only token string

                return Results.Ok(response);
            }
            catch (UnauthorizedAccessException)
            {
                return Results.Json(
                    new
                    {
                        message = "Invalid email or password."
                    },
                    statusCode: StatusCodes.Status401Unauthorized);
            }
        });
    }
}