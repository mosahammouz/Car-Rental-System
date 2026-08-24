using CarRentalSystem.Domain.Entities;
using CarRentalSystem.Infrastructure.Seeding; // reference to Domain
using Microsoft.EntityFrameworkCore;
namespace CarRentalSystem.Infrastructure.Data;

public class CarRentalDbContext : DbContext
{
 public CarRentalDbContext(DbContextOptions<CarRentalDbContext> options) : base(options) { }
 
 public DbSet<User> Users { get; set; }
 public DbSet<Car> Cars { get; set; }
 public DbSet<Reservation> Reservations { get; set; }
 
 //fluent api
 protected override void OnModelCreating(ModelBuilder modelBuilder)
 {
  modelBuilder.Entity<User>()
   .HasIndex(u => u.Email)
   .IsUnique();

  modelBuilder.Entity<Car>()
   .Property(c => c.DailyRate)
   .HasPrecision(18, 2);

  modelBuilder.Entity<Car>()
   .HasData(CarSeed.GetCars());

  modelBuilder.Entity<Reservation>()
   .Property(r => r.TotalPrice)
   .HasPrecision(18, 2);

  modelBuilder.Entity<Reservation>()
   .HasOne(r => r.User)
   .WithMany(u => u.Reservations)
   .HasForeignKey(r => r.UserId);

  modelBuilder.Entity<Reservation>()
   .HasOne(r => r.Car)
   .WithMany(c => c.Reservations)
   .HasForeignKey(r => r.CarId);
 }
 
}