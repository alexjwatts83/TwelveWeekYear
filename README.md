# TwelveWeekYear

A work in progress app simple app used to record and monitor progress for the a Tweleve week year.

## EF
`C:\Projects\dotnet\TwelveWeekYear\src (feature/ef-migration -> origin)`

### Add Migration
`dotnet ef migrations add Init --project TwelveWeekYear.Infrastructure -s TwelveWeekYear.WebApp`

### Update
`dotnet ef database update --project TwelveWeekYear.Infrastructure -s TwelveWeekYear.WebApp`