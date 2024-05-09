using bbetterApi.Models;
using database.Models;
using Microsoft.IdentityModel.Tokens;

namespace bbetterApi.Utils
{
    public class WhatToDoUtil
    {
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

        private class TaskComparator : IComparer<AccountTasks>
        {
            public int Compare(AccountTasks x, AccountTasks y)
            {
                // First, sort by importance
                if (x.IsImportant && !y.IsImportant)
                    return -1;
                if (!x.IsImportant && y.IsImportant)
                    return 1;

                // Then, sort by urgency
                if (x.IsUrgent && !y.IsUrgent)
                    return -1;
                if (!x.IsUrgent && y.IsUrgent)
                    return 1;

                // If both importance and urgency are equal, sort by deadline
                return DateTime.Compare(x.Deadline, y.Deadline);
            }
        }

        private static List<WhatToDoItem> FindTopTasks(List<AccountTasks> accountTasks)
        {
            accountTasks.Sort(new TaskComparator());
            List<AccountTasks> topThree = accountTasks.Take(3).ToList();
            List<WhatToDoItem> whatToDoItems = topThree.Select(ConvertToWhatToDoItem).ToList();
            return whatToDoItems;
        }
        private static List<WhatToDoItem> FindTopWishes(List<AccountWishes> accountWishes)
        {
            Random random = new Random();
            List<AccountWishes> threeWishes = accountWishes.OrderBy(x => random.Next()).Take(3).ToList();
            List<WhatToDoItem> whatToDoItems = threeWishes.Select(ConvertToWhatToDoItem).ToList();
            return whatToDoItems;
        }
        private static List<WhatToDoItem> FindTopGHabits(List<GHabitWithDates> accountGHabits)
        {
            var filteredArray = accountGHabits.Where(habit => habit.GHabitDates.IsNullOrEmpty());
            List<WhatToDoItem> whatToDoItems = filteredArray.Select(ConvertToWhatToDoItem).ToList();
            return whatToDoItems;
        }

        private static List<WhatToDoItem> FindTopThree(AccountActivities activities)
        {
            List<WhatToDoItem> topActivities = new List<WhatToDoItem>();

            var importantUrgentTasks = activities.tasks.Where(task => task.IsImportant && task.IsUrgent).ToList()
                                                        .Select(ConvertToWhatToDoItem);

            topActivities.AddRange(importantUrgentTasks);

            // Filter GHabits where GHabitDates are empty
            var emptyGHabits = activities.ghabits.Where(ghabit => ghabit.GHabitDates.IsNullOrEmpty()).ToList()
                                                 .Select(ConvertToWhatToDoItem); ;

            topActivities.AddRange(emptyGHabits);

            // Filter tasks that are not important and urgent
            var notImportantUrgentTasks = activities.tasks.Where(task => !task.IsImportant && task.IsUrgent).ToList()
                                                           .Select(ConvertToWhatToDoItem); ;

            topActivities.AddRange(notImportantUrgentTasks);

            // Filter tasks that are important and not urgent
            var importantNotUrgentTasks = activities.tasks.Where(task => task.IsImportant && !task.IsUrgent).ToList()
                                                            .Select(ConvertToWhatToDoItem); ;

            topActivities.AddRange(importantNotUrgentTasks);

            // Add wishes
            var wishes = activities.wishes.Select(ConvertToWhatToDoItem);
            topActivities.AddRange(wishes);

            // Filter tasks that are not important and not urgent
            var notImportantNotUrgentTasks = activities.tasks.Where(task => !task.IsImportant && !task.IsUrgent).ToList()
                                                                .Select(ConvertToWhatToDoItem); ;

            topActivities.AddRange(notImportantNotUrgentTasks);

            // Take top 3 activities
            return topActivities.Take(3).ToList();
        }

        private static WhatToDoItem ConvertToWhatToDoItem(AccountTasks task)
        {
            return new WhatToDoItem { Content = task.Content, Type = "Tasks" };
        }
        private static WhatToDoItem ConvertToWhatToDoItem(AccountWishes wish)
        {
            return new WhatToDoItem { Content = wish.Content, Type = "Wish" };
        }

        private static WhatToDoItem ConvertToWhatToDoItem(GHabitWithDates gHabit)
        {
            return new WhatToDoItem { Content = gHabit.Content, Type = "Good Habits" };
        }
    }
}
