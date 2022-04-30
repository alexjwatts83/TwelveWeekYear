using Microsoft.EntityFrameworkCore.Migrations;

namespace TwelveWeekYear.Infrastructure.Migrations
{
    public partial class ReAddedGoalsTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DaysResults_Goal_GoalId",
                table: "DaysResults");

            migrationBuilder.DropForeignKey(
                name: "FK_Goal_GoalTypes_GoalTypeId",
                table: "Goal");

            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_Goal_GoalId",
                table: "Tasks");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Goal",
                table: "Goal");

            migrationBuilder.RenameTable(
                name: "Goal",
                newName: "Goals");

            migrationBuilder.RenameIndex(
                name: "IX_Goal_GoalTypeId",
                table: "Goals",
                newName: "IX_Goals_GoalTypeId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Goals",
                table: "Goals",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_DaysResults_Goals_GoalId",
                table: "DaysResults",
                column: "GoalId",
                principalTable: "Goals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Goals_GoalTypes_GoalTypeId",
                table: "Goals",
                column: "GoalTypeId",
                principalTable: "GoalTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_Goals_GoalId",
                table: "Tasks",
                column: "GoalId",
                principalTable: "Goals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DaysResults_Goals_GoalId",
                table: "DaysResults");

            migrationBuilder.DropForeignKey(
                name: "FK_Goals_GoalTypes_GoalTypeId",
                table: "Goals");

            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_Goals_GoalId",
                table: "Tasks");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Goals",
                table: "Goals");

            migrationBuilder.RenameTable(
                name: "Goals",
                newName: "Goal");

            migrationBuilder.RenameIndex(
                name: "IX_Goals_GoalTypeId",
                table: "Goal",
                newName: "IX_Goal_GoalTypeId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Goal",
                table: "Goal",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_DaysResults_Goal_GoalId",
                table: "DaysResults",
                column: "GoalId",
                principalTable: "Goal",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Goal_GoalTypes_GoalTypeId",
                table: "Goal",
                column: "GoalTypeId",
                principalTable: "GoalTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_Goal_GoalId",
                table: "Tasks",
                column: "GoalId",
                principalTable: "Goal",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
