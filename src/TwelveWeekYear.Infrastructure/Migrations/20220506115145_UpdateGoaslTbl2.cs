using Microsoft.EntityFrameworkCore.Migrations;

namespace TwelveWeekYear.Infrastructure.Migrations
{
    public partial class UpdateGoaslTbl2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Goals_TweleveWeekYears_TweleveWeekYearId",
                table: "Goals");

            migrationBuilder.AlterColumn<int>(
                name: "TweleveWeekYearId",
                table: "Goals",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Goals_TweleveWeekYears_TweleveWeekYearId",
                table: "Goals",
                column: "TweleveWeekYearId",
                principalTable: "TweleveWeekYears",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Goals_TweleveWeekYears_TweleveWeekYearId",
                table: "Goals");

            migrationBuilder.AlterColumn<int>(
                name: "TweleveWeekYearId",
                table: "Goals",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Goals_TweleveWeekYears_TweleveWeekYearId",
                table: "Goals",
                column: "TweleveWeekYearId",
                principalTable: "TweleveWeekYears",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
