using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TwelveWeekYear.Infrastructure.Migrations
{
    public partial class AddedTwevlveWeekYearWeeks : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TweleveWeekYearWeeks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    WeekNumber = table.Column<int>(type: "int", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TweleveWeekYearId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TweleveWeekYearWeeks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TweleveWeekYearWeeks_TweleveWeekYears_TweleveWeekYearId",
                        column: x => x.TweleveWeekYearId,
                        principalTable: "TweleveWeekYears",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TweleveWeekYearWeeks_TweleveWeekYearId",
                table: "TweleveWeekYearWeeks",
                column: "TweleveWeekYearId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TweleveWeekYearWeeks");
        }
    }
}
