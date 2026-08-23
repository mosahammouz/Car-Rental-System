using CarRentalSystem.Application.DTOs.Auth;
using CarRentalSystem.Application.Interfaces.Repositories;
using CarRentalSystem.Application.Interfaces.Services;
using CarRentalSystem.Domain.Entities;
using CarRentalSystem.Domain.Enums;

namespace CarRentalSystem.Application.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    public AuthService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task RegisterAsync(RegisterRequest request)
    {
       
        var emailExists = await _userRepository.EmailExistsAsync(request.Email);
        if (emailExists) { throw new InvalidOperationException("An account with this email already exists."); }

        if (request.Password != request.ConfirmPassword)
        {
            throw new InvalidOperationException("Password and confirmation password do not match.");
        }

      
        var user = new User
        {
            FirstName = request.FirstName,
            LastName = request.LastName,
            Email = request.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password), // it will use Salt to avoid same hashes
            PhoneNumber = request.PhoneNumber,
            DateOfBirth = request.DateOfBirth,
            AddressLine1 = request.AddressLine1,
            AddressLine2 = request.AddressLine2,
            City = request.City,
            Country = request.Country,
            DriversLicenseNumber = request.DriversLicenseNumber,

            Role = UserRole.Customer
        };

        await _userRepository.AddAsync(user);

     
    }

    public async Task LoginAsync(LoginRequest request)
    {
        var user = await _userRepository.GetByEmailAsync(request.Email);

        if (user is null)
        {
            throw new UnauthorizedAccessException("Invalid email or password.");
        }

        var isPasswordValid = BCrypt.Net.BCrypt.Verify(
            request.Password,
            user.PasswordHash
        );

        if (!isPasswordValid)
        {
            throw new UnauthorizedAccessException("Invalid email or password.");
        }

        // Login successful
    }
}