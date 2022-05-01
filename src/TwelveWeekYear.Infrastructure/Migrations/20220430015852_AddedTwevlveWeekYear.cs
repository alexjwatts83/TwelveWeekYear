using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TwelveWeekYear.Infrastructure.Migrations
{
    public partial class AddedTwevlveWeekYear : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TweleveWeekYearId",
                table: "Goals",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "TweleveWeekYears",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TweleveWeekYears", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Goals_TweleveWeekYearId",
                table: "Goals",
                column: "TweleveWeekYearId");

            migrationBuilder.AddForeignKey(
                name: "FK_Goals_TweleveWeekYears_TweleveWeekYearId",
                table: "Goals",
                column: "TweleveWeekYearId",
                principalTable: "TweleveWeekYears",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Goals_TweleveWeekYears_TweleveWeekYearId",
                table: "Goals");

            migrationBuilder.DropTable(
                name: "TweleveWeekYears");

            migrationBuilder.DropIndex(
                name: "IX_Goals_TweleveWeekYearId",
                table: "Goals");

            migrationBuilder.DropColumn(
                name: "TweleveWeekYearId",
                table: "Goals");
        }
    }
}
