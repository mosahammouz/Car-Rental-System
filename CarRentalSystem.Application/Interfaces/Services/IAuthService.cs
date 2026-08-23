using CarRentalSystem.Application.DTOs.Auth;

namespace CarRentalSystem.Application.Interfaces.Services;

public interface IAuthService
{
        Task RegisterAsync(RegisterRequest request);
        Task LoginAsync(LoginRequest request);
}