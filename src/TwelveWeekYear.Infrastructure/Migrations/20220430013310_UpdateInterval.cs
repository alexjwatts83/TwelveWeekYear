using Microsoft.EntityFrameworkCore.Migrations;

namespace TwelveWeekYear.Infrastructure.Migrations
{
    public partial class UpdateInterval : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Intervals",
                newName: "IntervalId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IntervalId",
                table: "Intervals",
                newName: "Id");
        }
    }
}
