using bbetterApi.Models;
using database.Models;
using Task = database.Models.Task;

namespace bbetterApi.Utils
{
    public class StatsUtil
    {
        public static DateTime StartOfWeek(DateTime dt, DayOfWeek startOfWeek)
        {
            int diff = (7 + (dt.DayOfWeek - startOfWeek)) % 7;
            return dt.AddDays(-1 * diff).Date;
        }

        public static Statistics CalculateStats(AccountActivities accountActivities)
        {
            List<Task> tasks = accountActivities.tasks;
            List<Wish> wishes = accountActivities.wishes;
            List<GHabitWithDates> ghabits = accountActivities.ghabits;
            DateTime startOfWeek = StartOfWeek(DateTime.Now, DayOfWeek.Monday);
            DateTime endOfWeek = startOfWeek.AddDays(7);

            //Tasks
            var numOfTasksWithDeadlineThisWeek = tasks.Count(t => t.Deadline >= startOfWeek && t.Deadline < endOfWeek);
            var tasksWithDeadlineAndCompleteDateThisWeek = tasks.Where(t => t.Deadline >= startOfWeek && t.Deadline < endOfWeek && t.CompleteDate >= startOfWeek && t.CompleteDate < endOfWeek).ToList();
            var tasksWithDeadlineThisWeekAndCompleteDateLater = tasks.Where(t => t.Deadline >= startOfWeek && t.Deadline < endOfWeek && t.CompleteDate > t.Deadline).ToList();
            int numOfThisWeekCompleted = tasksWithDeadlineAndCompleteDateThisWeek.Count - tasksWithDeadlineThisWeekAndCompleteDateLater.Count;
            int numOftasksWithCompleteDateThisWeek = tasks.Count(t => t.CompleteDate >= startOfWeek && t.CompleteDate < endOfWeek);
            int numOfExtraWork = numOftasksWithCompleteDateThisWeek - numOfThisWeekCompleted;

            //Wishes
            List<Wish> thisWeekWishesCompleted = wishes.Where(w => w.IsCompleted && w.CompleteDate >= startOfWeek && w.CompleteDate <= endOfWeek).ToList();
            int totalThisWeekWishes = thisWeekWishesCompleted.Count;

            //GHabits
            int totalGHabits = ghabits.Count;
            int gHabitEntries = ghabits.Sum(g => g.GHabitDates.Count);
            int gHabitsCompleted = ghabits.Count(g => g.GHabitDates.Count >= 7);
            int totalPossibleGHabitEntries = totalGHabits * 7;

            double taskCompletionRate = numOfTasksWithDeadlineThisWeek > 0 ? (double)(numOfThisWeekCompleted / numOfTasksWithDeadlineThisWeek) * 100 : 0;
            double habitEngagementRate = totalPossibleGHabitEntries > 0 ? (double)(gHabitEntries / totalPossibleGHabitEntries) * 100 : 0;
            double wishBonus = totalThisWeekWishes * 10;
            double taskBonus = numOfExtraWork * 5;

            double productivityCoefficient = (0.5 * taskCompletionRate) + (0.5 * habitEngagementRate) + wishBonus + taskBonus;

            var stats = new Statistics
            {
                EntryDate = endOfWeek,
                Type = "week",
                ProductivityCoef = productivityCoefficient,
                TaskCompletionRate = taskCompletionRate,
                TaskCompeletedNum = numOfThisWeekCompleted,
                TaskCompletedExtra = numOfExtraWork,
                GHabitCompletionRate = habitEngagementRate,
                GHabitFullyCompleted = gHabitsCompleted,
                WishesCompleteNum = totalThisWeekWishes,
            };

            return stats;
        }
    }
}
