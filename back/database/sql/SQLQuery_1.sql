use master
DROP DATABASE bbetterDb

CREATE DATABASE bbetterDb
GO

use bbetterDb
CREATE SCHEMA bbetterSchema
GO

CREATE TABLE bbetterSchema.Accounts
(
    AccountId INT IDENTITY(1,1) PRIMARY KEY,
    Username VARCHAR(32),
    PasswordHash VARCHAR(400),
    RefreshToken VARCHAR(500),
    TokenCreated DATETIME,
    TokenExpires DATETIME,
    QuoteOfDayId VARCHAR(30),
    QuoteExpires DATETIME,
)

DROP TABLE bbetterSchema.Tasks
DROP TABLE bbetterSchema.Wishes

CREATE TABLE bbetterSchema.Tasks
(
    TaskId INT IDENTITY(1,1) PRIMARY KEY,
    AccountId INT REFERENCES bbetterSchema.Accounts(AccountId),
    Content VARCHAR(300),
    IsUrgent BIT,
    IsImportant BIT,
    Deadline DATETIME,
    IsCompleted BIT,
    CompleteDate DATETIME
)

CREATE TABLE bbetterSchema.Wishes
(
    WishId INT IDENTITY(1,1) PRIMARY KEY,
    AccountId INT REFERENCES bbetterSchema.Accounts(AccountId),
    Content VARCHAR(300),
    IsCompleted BIT,
    CompleteDate DATETIME,
)

CREATE TABLE bbetterSchema.GHabits
(
    GHabitId INT IDENTITY(1,1) PRIMARY KEY,
    AccountId INT REFERENCES bbetterSchema.Accounts(AccountId),
    Content VARCHAR(300),
)

CREATE TABLE bbetterSchema.GHabitDate
(
    GHabitDateId INT IDENTITY(1,1) PRIMARY KEY,
    GHabitId INT REFERENCES bbetterSchema.GHabits(GHabitId),
    DateOf DATETIME,
)

CREATE TABLE bbetterSchema.BHabits
(
    BHabitId INT IDENTITY(1,1) PRIMARY KEY,
    AccountId INT REFERENCES bbetterSchema.Accounts(AccountId),
    Content VARCHAR(300),
    IssueDate DATETIME,
)

CREATE TABLE bbetterSchema.BHabitDate
(
    BHabitDateId INT IDENTITY(1,1) PRIMARY KEY,
    BHabitId INT REFERENCES bbetterSchema.BHabits(BHabitId),
    DateOf DATETIME,
)

CREATE TABLE bbetterSchema.UserQuotes
(
    UserQuoteId INT IDENTITY(1,1) PRIMARY KEY,
    AccountId INT REFERENCES bbetterSchema.Accounts(AccountId),
    Author VARCHAR(150),
    Quote VARCHAR(500)
)

CREATE TABLE bbetterSchema.Reflections
(
    ReflectionId INT IDENTITY(1,1) PRIMARY KEY,
    AccountId INT REFERENCES bbetterSchema.Accounts(AccountId),
    DateOf DATETIME,
    Emotion INT,
    Productivity INT,
    ThreeWords VARCHAR(200),
    UserGoal VARCHAR(500)
)

SELECT * FROM bbetterSchema.Accounts;

SET DATEFIRST 1;
DECLARE @today DATE = GETDATE();
DECLARE @startOfLastWeek DATE = DATEADD(day, 1 - DATEPART(weekday, @today) - 7, @today);
DECLARE @endOfLastWeek DATE = DATEADD(day, 7, @startOfLastWeek);
SELECT GHD.GHabitDateId, GHD.DateOf, GHD.GHabitId
FROM bbetterSchema.GHabits GH
JOIN bbetterSchema.GHabitDate GHD ON GH.GHabitId = GHD.GHabitId
WHERE GH.AccountId = 1
AND GHD.DateOf >= @startOfLastWeek 
AND GHD.DateOf < @endOfLastWeek;

ALTER TABLE bbetterSchema.Accounts
ADD isUserQuote BIT DEFAULT 0;