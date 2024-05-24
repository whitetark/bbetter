using bbetter.API.Models.Responses;
using database.Models;
using Microsoft.IdentityModel.Tokens;
using System.Text.RegularExpressions;
using Task = database.Models.Task;

namespace bbetterApi.Utils
{
    public class WhatToDoUtil
    {
        public static WhatToDoResponse ParseWhatToDoResponse(string input, int id)
        {
            var response = new WhatToDoResponse
            {
                topThree = new List<WhatToDoItem>(),
                topTasks = new List<WhatToDoItem>(),
                topWishes = new List<WhatToDoItem>(),
                topGhabits = new List<WhatToDoItem>()
            };

            var sections = input.Split(new string[] { "\n\n" }, StringSplitOptions.RemoveEmptyEntries);

            foreach (var section in sections)
            {
                var lines = section.Split(new string[] { "\n" }, StringSplitOptions.RemoveEmptyEntries);
                var sectionTitle = lines[0];
                var items = lines.Skip(1).Select(ParseWhatToDoItem).ToList();

                if (sectionTitle.StartsWith("Top Three of All"))
                {
                    response.topThree.AddRange(items);
                }
                else if (sectionTitle.StartsWith("Top Three Tasks"))
                {
                    response.topTasks.AddRange(items);
                }
                else if (sectionTitle.StartsWith("Top Three Wishes"))
                {
                    response.topWishes.AddRange(items);
                }
                else if (sectionTitle.StartsWith("Top Three Good Habits"))
                {
                    response.topGhabits.AddRange(items);
                }
            }

            response.accountId = id;

            return response;
        }

        public static WhatToDoItem ParseWhatToDoItem(string line)
        {
            var contentEndIndex = line.LastIndexOf('[');
            var content = line.Substring(2, contentEndIndex - 3).Trim(); // Skipping "- " at the start
            var type = line.Substring(contentEndIndex + 1, line.Length - contentEndIndex - 2).Trim();

            return new WhatToDoItem
            {
                Content = content,
                Type = type
            };
        }


        public static WhatToDoResponse FormatData(AccountActivities accountActivities)
        {
            var result = new WhatToDoResponse
            {
                accountId = accountActivities.accountId,
                topTasks = FindTopTasks(accountActivities.tasks),
                topWishes = FindTopWishes(accountActivities.wishes),
                topGhabits = FindTopGHabits(accountActivities.ghabits),
                topThree = FindTopThree(accountActivities)
            };

            return result;
        }

        private class TaskComparator : IComparer<Task>
        {
            public int Compare(Task x, Task y)
            {
                if (x.IsImportant && !y.IsImportant)
                    return -1;
                if (!x.IsImportant && y.IsImportant)
                    return 1;

                if (x.IsUrgent && !y.IsUrgent)
                    return -1;
                if (!x.IsUrgent && y.IsUrgent)
                    return 1;

                return DateTime.Compare(x.Deadline, y.Deadline);
            }
        }

        private static List<WhatToDoItem> FindTopTasks(List<Task> accountTasks)
        {
            accountTasks.Sort(new TaskComparator());
            List<Task> topThree = accountTasks.Take(3).ToList();
            var whatToDoItems = topThree.Select(ConvertToWhatToDoItem).ToList();
            return whatToDoItems;
        }
        private static List<WhatToDoItem> FindTopWishes(List<Wish> accountWishes)
        {
            Random random = new Random();
            List<Wish> threeWishes = accountWishes.OrderBy(x => random.Next()).Take(3).ToList();
            var whatToDoItems = threeWishes.Select(ConvertToWhatToDoItem).ToList();
            return whatToDoItems;
        }
        private static List<WhatToDoItem> FindTopGHabits(List<GHabitWithDates> accountGHabits)
        {
            var filteredArray = accountGHabits.Where(habit => habit.GHabitDates.IsNullOrEmpty());
            var whatToDoItems = filteredArray.Select(ConvertToWhatToDoItem).ToList();
            return whatToDoItems;
        }

        private static List<WhatToDoItem> FindTopThree(AccountActivities activities)
        {
            List<WhatToDoItem> topActivities = new List<WhatToDoItem>();

            var importantUrgentTasks = activities.tasks.Where(task => task.IsImportant && task.IsUrgent).ToList().Select(ConvertToWhatToDoItem);
            var emptyGHabits = activities.ghabits.Where(ghabit => ghabit.GHabitDates.IsNullOrEmpty()).ToList().Select(ConvertToWhatToDoItem); ;
            var notImportantUrgentTasks = activities.tasks.Where(task => !task.IsImportant && task.IsUrgent).ToList().Select(ConvertToWhatToDoItem); ;
            var importantNotUrgentTasks = activities.tasks.Where(task => task.IsImportant && !task.IsUrgent).ToList().Select(ConvertToWhatToDoItem); ;
            var wishes = activities.wishes.Select(ConvertToWhatToDoItem);
            var notImportantNotUrgentTasks = activities.tasks.Where(task => !task.IsImportant && !task.IsUrgent).ToList().Select(ConvertToWhatToDoItem);

            topActivities.AddRange(importantUrgentTasks);
            topActivities.AddRange(emptyGHabits);
            topActivities.AddRange(notImportantUrgentTasks);
            topActivities.AddRange(importantNotUrgentTasks);
            topActivities.AddRange(wishes);
            topActivities.AddRange(notImportantNotUrgentTasks);

            return topActivities.Take(3).ToList();
        }

        private static WhatToDoItem ConvertToWhatToDoItem(Task task)
        {
            return new WhatToDoItem { Content = task.Content, Type = "Tasks" };
        }
        private static WhatToDoItem ConvertToWhatToDoItem(Wish wish)
        {
            return new WhatToDoItem { Content = wish.Content, Type = "Wish" };
        }

        private static WhatToDoItem ConvertToWhatToDoItem(GHabitWithDates gHabit)
        {
            return new WhatToDoItem { Content = gHabit.Content, Type = "Good Habits" };
        }
    }
}
