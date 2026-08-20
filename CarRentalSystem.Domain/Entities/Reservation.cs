namespace CarRentalSystem.Domain.Entities;

public class Reservation
{
    public int Id { get; set; }

    public int UserId { get; set; } // FK
    public int CarId { get; set; } // FK 

    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }

    public decimal TotalPrice { get; set; }
}