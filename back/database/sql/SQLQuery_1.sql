use master

CREATE DATABASE bbetterDb
use bbetterDb

CREATE SCHEMA bbetterSchema
GO

CREATE TABLE bbetterSchema.Accounts
(
    AccountId INT IDENTITY(1,1) PRIMARY KEY,
    Username VARCHAR(32),
    PasswordHash VARCHAR(1000),
    RefreshToken VARCHAR(2000),
    TokenCreated VARCHAR(2000),
    TokenExpires VARCHAR(2000)
)

CREATE TABLE bbetterSchema.Tasks
(
    TaskId INT IDENTITY(1,1) PRIMARY KEY,
    AccountId INT REFERENCES bbetterSchema.Accounts(AccountId),
    Content VARCHAR(1000),
    IsUrgent BIT,
    IsImportant BIT,
    Deadline DATETIME,
    IsCompleted BIT,
)

CREATE TABLE bbetterSchema.Wishes
(
    WishId INT IDENTITY(1,1) PRIMARY KEY,
    AccountId INT REFERENCES bbetterSchema.Accounts(AccountId),
    Content VARCHAR(1000),
    IsCompleted BIT,
)

CREATE TABLE bbetterSchema.GHabits
(
    GHabitId INT IDENTITY(1,1) PRIMARY KEY,
    AccountId INT REFERENCES bbetterSchema.Accounts(AccountId),
    Content VARCHAR(1000),
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
    Content VARCHAR(1000),
    IssueDate DATETIME,
)

CREATE TABLE bbetterSchema.BHabitDate
(
    BHabitDateId INT IDENTITY(1,1) PRIMARY KEY,
    BHabitId INT REFERENCES bbetterSchema.BHabits(BHabitId),
    DateOf DATETIME,
)

CREATE TABLE bbetterSchema.Quotes
(
    QuoteId INT IDENTITY(1,1) PRIMARY KEY,
    Author VARCHAR(100),
    Content VARCHAR(2000),
)

CREATE TABLE bbetterSchema.UserQuotes
(
    UserQuoteId INT IDENTITY(1,1) PRIMARY KEY,
    AccountId INT REFERENCES bbetterSchema.Accounts(AccountId),
    Author VARCHAR(100),
    Quote VARCHAR(2000)
)

SELECT * FROM bbetterSchema.Accounts;

SET DATEFIRST 1
SELECT GH.GHabitId, GH.AccountId, GH.Content, GHD.GHabitDateId, GHD.DateOf
FROM bbetterSchema.GHabits GH
JOIN bbetterSchema.GHabitDate GHD ON GH.GHabitId = GHD.GHabitId
WHERE GH.AccountId = 1 
AND DATEPART(week, DateOf) = DATEPART(week, GETDATE())
AND DATEPART(year, DateOf) = DATEPART(year, GETDATE())