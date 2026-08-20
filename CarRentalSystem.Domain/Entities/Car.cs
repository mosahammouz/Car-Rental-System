namespace CarRentalSystem.Domain.Entities;

public class Car
{
        public int Id { get; set; }

        public string Make { get; set; } = "";
        public string Model { get; set; } = "";

        public int Year { get; set; }

        public string Location { get; set; } = "";

        public decimal DailyRate { get; set; }

        public bool IsAvailable { get; set; }
        public ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();
}