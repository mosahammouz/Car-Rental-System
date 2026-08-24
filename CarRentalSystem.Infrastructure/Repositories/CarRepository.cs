using CarRentalSystem.Application.Interfaces.Repositories;
using CarRentalSystem.Domain.Entities;
using CarRentalSystem.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace CarRentalSystem.Infrastructure.Repositories;

public class CarRepository : ICarRepository
{
    private readonly CarRentalDbContext _context;
    public CarRepository(CarRentalDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Car>> GetAvailableAsync() // return a list
    {
        return await _context.Cars
            .Where(c => c.IsAvailable)
            .ToListAsync();
    }

    public async Task<IEnumerable<Car>> SearchAsync( // return a list
        string? location,
        decimal? maxDailyRate)
    {
        var query = _context.Cars
            .Where(c => c.IsAvailable)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(location))
        {
            query = query.Where(c =>
                c.Location.Contains(location));
        }

        if (maxDailyRate.HasValue)
        {
            query = query.Where(c =>
                c.DailyRate <= maxDailyRate.Value);
        }

        return await query.ToListAsync(); 
    }
}