using CarRentalSystem.Domain.Entities;
namespace CarRentalSystem.Application.Interfaces.Repositories;

public interface ICarRepository
{
    Task<IEnumerable<Car>> GetAvailableAsync();
    Task<IEnumerable<Car>> SearchAsync(string? location, decimal? maxDailyRate);
}