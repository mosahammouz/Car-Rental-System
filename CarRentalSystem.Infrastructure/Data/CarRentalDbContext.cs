using CarRentalSystem.Domain.Entities; // reference to Domain
using Microsoft.EntityFrameworkCore;
namespace CarRentalSystem.Infrastructure.Data;

public class CarRentalDbContext : DbContext
{
 public CarRentalDbContext(DbContextOptions<CarRentalDbContext> options) : base(options) { }
 
 public DbSet<User> Users { get; set; }
 public DbSet<Car> Cars { get; set; }
 public DbSet<Reservation> Reservations { get; set; }
 
}