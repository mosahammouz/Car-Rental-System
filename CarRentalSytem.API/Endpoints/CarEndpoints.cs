using CarRentalSystem.Application.Interfaces.Repositories;
using CarRentalSystem.Infrastructure.Repositories;

namespace CarRentalSytem.API.Endpoints;

public static class CarEndpoints
{
 public static void MapCarEndpoints(this WebApplication app)
 {
  var group = app.MapGroup("/api/cars").WithTags("Cars");//withTags for Ui in swagger 
  group.MapGet("/available", async (ICarRepository carRepository) =>
  {
      var listOfCars = await carRepository.GetAvailableAsync();
      return Results.Ok(listOfCars);
  });
  group.MapGet("/search", async (
      string? location,
      decimal? maxDailyRate, // those will be as query parameters cuz they are not in the link {}
      ICarRepository carRepository) =>
  {
      var cars = await carRepository.SearchAsync(location, maxDailyRate);

      return Results.Ok(cars);
  });
 }
 
}