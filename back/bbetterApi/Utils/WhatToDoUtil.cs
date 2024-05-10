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

        private static List<WhatToDoItem> FindTopTasks(List<AccountTasks> accountTasks)
        {
            accountTasks.Sort(new TaskComparator());
            List<AccountTasks> topThree = accountTasks.Take(3).ToList();
            var whatToDoItems = topThree.Select(ConvertToWhatToDoItem).ToList();
            return whatToDoItems;
        }
        private static List<WhatToDoItem> FindTopWishes(List<AccountWishes> accountWishes)
        {
            Random random = new Random();
            List<AccountWishes> threeWishes = accountWishes.OrderBy(x => random.Next()).Take(3).ToList();
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
