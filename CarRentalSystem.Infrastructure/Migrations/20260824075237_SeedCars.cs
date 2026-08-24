using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CarRentalSystem.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class SeedCars : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Cars",
                columns: new[] { "Id", "DailyRate", "IsAvailable", "Location", "Make", "Model", "Year" },
                values: new object[,]
                {
                    { 1, 50.00m, true, "Nablus", "Toyota", "Camry", 2023 },
                    { 2, 45.00m, true, "Nablus", "Honda", "Civic", 2022 },
                    { 3, 120.00m, true, "Ramallah", "BMW", "X5", 2024 },
                    { 4, 100.00m, true, "Ramallah", "Mercedes-Benz", "C-Class", 2023 },
                    { 5, 40.00m, true, "Nablus", "Hyundai", "Elantra", 2022 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Cars",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Cars",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Cars",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Cars",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Cars",
                keyColumn: "Id",
                keyValue: 5);
        }
    }
}
