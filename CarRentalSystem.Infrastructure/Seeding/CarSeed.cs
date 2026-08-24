using CarRentalSystem.Domain.Entities;

namespace CarRentalSystem.Infrastructure.Seeding;

public static class CarSeed
{
    public static List<Car> GetCars()
    {
        return new List<Car>
        {
            new Car
            {
                Id = 1,
                Make = "Toyota",
                Model = "Camry",
                Year = 2023,
                Location = "Nablus",
                DailyRate = 50.00m,
                IsAvailable = true
            },
            new Car
            {
                Id = 2,
                Make = "Honda",
                Model = "Civic",
                Year = 2022,
                Location = "Nablus",
                DailyRate = 45.00m,
                IsAvailable = true
            },
            new Car
            {
                Id = 3,
                Make = "BMW",
                Model = "X5",
                Year = 2024,
                Location = "Ramallah",
                DailyRate = 120.00m,
                IsAvailable = true
            },
            new Car
            {
                Id = 4,
                Make = "Mercedes-Benz",
                Model = "C-Class",
                Year = 2023,
                Location = "Ramallah",
                DailyRate = 100.00m,
                IsAvailable = true
            },
            new Car
            {
                Id = 5,
                Make = "Hyundai",
                Model = "Elantra",
                Year = 2022,
                Location = "Nablus",
                DailyRate = 40.00m,
                IsAvailable = true
            }
        };
    }
}