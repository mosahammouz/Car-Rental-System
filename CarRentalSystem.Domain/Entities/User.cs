using CarRentalSystem.Domain.Enums;

namespace CarRentalSystem.Domain.Entities;

    public class User
    {
        public int Id { get; set; }

        public string FirstName { get; set; } = "";
        public string LastName { get; set; } = "";

        public string Email { get; set; } = "";

        public string PasswordHash { get; set; } = "";
         // password + salt => hashing // if 2 users have the same password then they will not have the same hashed value
         // The password hasher generates a unique salt,
        public string PhoneNumber { get; set; } = "";

        public DateTime? DateOfBirth { get; set; }

        public string AddressLine1 { get; set; } = "";
        public string? AddressLine2 { get; set; }

        public string City { get; set; } = "";
        public string Country { get; set; } = "";

        public string DriversLicenseNumber { get; set; } = "";

        public UserRole Role { get; set; } = UserRole.Customer;
    }
