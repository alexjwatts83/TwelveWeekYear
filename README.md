# TwelveWeekYear

A work in progress app simple app used to record and monitor progress for the a Tweleve week year.

## debug
`cd C:\Projects\dotnet\TwelveWeekYear`

`dotnet watch run --project src\TwelveWeekYear.GraphQL`

## EF
`C:\Projects\dotnet\TwelveWeekYear\src (feature/ef-migration -> origin)`

### Add Migration
`dotnet ef migrations add Init --project TwelveWeekYear.Infrastructure -s TwelveWeekYear.WebApp`

### Update
`dotnet ef database update --project TwelveWeekYear.Infrastructure -s TwelveWeekYear.WebApp`

### Remove
`dotnet ef migrations remove --project TwelveWeekYear.Infrastructure -s TwelveWeekYear.WebApp`

### Setup
See: https://chillicream.com/docs/hotchocolate/integrations/entity-framework

### SQL
Queries

`DELETE FROM dbo.GoalTypes`

`DBCC CHECKIDENT ('TwelveWeekYear-DEV.dbo.GoalTypes', RESEED, 0)`
