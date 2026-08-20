namespace CarRentalSystem.Domain.Entities;

public class Reservation
{
    public int Id { get; set; }

    public int UserId { get; set; }
    public User User { get; set; } = null!; // Navigational prop.

    public int CarId { get; set; }
    public Car Car { get; set; } = null!; // Navigational prop.

    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }

    public decimal TotalPrice { get; set; }
}