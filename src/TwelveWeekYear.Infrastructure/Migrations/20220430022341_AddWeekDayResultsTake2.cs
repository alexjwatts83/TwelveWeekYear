using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TwelveWeekYear.Infrastructure.Migrations
{
    public partial class AddWeekDayResultsTake2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WeekDayResults");

            migrationBuilder.CreateTable(
                name: "WeekDaySubtasksResults",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    WeekNumber = table.Column<int>(type: "int", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SubtaskId = table.Column<int>(type: "int", nullable: false),
                    Completed = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WeekDaySubtasksResults", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WeekDaySubtasksResults_Subtasks_SubtaskId",
                        column: x => x.SubtaskId,
                        principalTable: "Subtasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WeekDayTasksResults",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    WeekNumber = table.Column<int>(type: "int", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TaskId = table.Column<int>(type: "int", nullable: false),
                    Completed = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WeekDayTasksResults", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WeekDayTasksResults_Tasks_TaskId",
                        column: x => x.TaskId,
                        principalTable: "Tasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_WeekDaySubtasksResults_SubtaskId",
                table: "WeekDaySubtasksResults",
                column: "SubtaskId");

            migrationBuilder.CreateIndex(
                name: "IX_WeekDayTasksResults_TaskId",
                table: "WeekDayTasksResults",
                column: "TaskId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WeekDaySubtasksResults");

            migrationBuilder.DropTable(
                name: "WeekDayTasksResults");

            migrationBuilder.CreateTable(
                name: "WeekDayResults",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Completed = table.Column<bool>(type: "bit", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TaskId = table.Column<int>(type: "int", nullable: false),
                    WeekNumber = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WeekDayResults", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WeekDayResults_Tasks_TaskId",
                        column: x => x.TaskId,
                        principalTable: "Tasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_WeekDayResults_TaskId",
                table: "WeekDayResults",
                column: "TaskId");
        }
    }
}
