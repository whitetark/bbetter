using bbetterApi.Middleware;
using bbetterApi.Models;
using database.Models;
using Task = database.Models.Task;

namespace bbetterApi.Utils
{
    public class StatsUtil
    {
        public static Statistics CalculateStats(AccountActivities accountActivities, string type)
        {
            List<Task> tasks = accountActivities.tasks;
            List<Wish> wishes = accountActivities.wishes;
            List<GHabitWithDates> ghabits = accountActivities.ghabits;

            GetDateRange(type, out DateTime startOfDate, out DateTime endOfDate);

            //Tasks
            var numOfTasksWithDeadlineThisWeek = tasks.Count(t => t.Deadline >= startOfDate && t.Deadline < endOfDate);
            var tasksCompleted = tasks.Where(t => t.IsCompleted == true);
            var tasksWithDeadlineAndCompleteDateThisWeek = tasksCompleted.Where(t => t.Deadline >= startOfDate && t.Deadline < endOfDate && t.CompleteDate >= startOfDate && t.CompleteDate < endOfDate).ToList();
            var tasksWithDeadlineThisWeekAndCompleteDateLater = tasksCompleted.Where(t => t.Deadline >= startOfDate && t.Deadline < endOfDate && t.CompleteDate > t.Deadline).ToList();
            double numOfThisWeekCompleted = tasksWithDeadlineAndCompleteDateThisWeek.Count - tasksWithDeadlineThisWeekAndCompleteDateLater.Count;
            double numOftasksWithCompleteDateThisWeek = tasksCompleted.Count(t => t.CompleteDate >= startOfDate && t.CompleteDate < endOfDate);
            double numOfExtraWork = numOftasksWithCompleteDateThisWeek - tasksWithDeadlineAndCompleteDateThisWeek.Count;

            //Wishes
            List<Wish> thisWeekWishesCompleted = wishes.Where(w => w.IsCompleted && w.CompleteDate >= startOfDate && w.CompleteDate <= endOfDate).ToList();
            double totalThisWeekWishes = thisWeekWishesCompleted.Count;

            //GHabits
            double totalGHabits = ghabits.Count;
            double gHabitEntries = ghabits.Sum(g => g.GHabitDates.Count);
            double gHabitsCompleted = ghabits.Count(g => g.GHabitDates.Count >= 7);
            double totalPossibleGHabitEntries = totalGHabits * 7;

            double taskCompletionRate = 0;
            double habitEngagementRate = 0;
            if(numOfTasksWithDeadlineThisWeek > 0)
            {
                taskCompletionRate = (numOfThisWeekCompleted / numOfTasksWithDeadlineThisWeek) * 100;
            }
            if (totalPossibleGHabitEntries > 0)
            {
                habitEngagementRate = (double)(gHabitEntries / totalPossibleGHabitEntries) * 100;
            }
            double wishBonus = totalThisWeekWishes * 10;
            double taskBonus = numOfExtraWork * 5;

            double productivityCoefficient = (0.5 * taskCompletionRate) + (0.5 * habitEngagementRate) + wishBonus + taskBonus;

            var stats = new Statistics
            {
                AccountId = accountActivities.accountId,
                EntryDate = endOfDate,
                Type = "week",
                ProductivityCoef = productivityCoefficient,
                TaskCompletionRate = Math.Round(taskCompletionRate, 2),
                TaskCompletedNum = tasksWithDeadlineAndCompleteDateThisWeek.Count,
                TaskCompletedExtra = numOfExtraWork,
                GHabitCompletionRate = Math.Round(habitEngagementRate, 2),
                GHabitFullyCompleted = gHabitsCompleted,
                WishesCompleteNum = totalThisWeekWishes,
            };

            return stats;
        }

        public static DateTime StartOfWeek(DateTime dt, DayOfWeek startOfWeek)
        {
            int diff = (7 + (dt.DayOfWeek - startOfWeek)) % 7;
            return dt.AddDays(-1 * diff).Date;
        }

        public static void GetDateRange(string type, out DateTime startOfDate, out DateTime endOfDate)
        {
            DateTime today = DateTime.Now;

            switch (type.ToLower())
            {
                case "week":
                    startOfDate = StartOfWeek(today.AddDays(-7), DayOfWeek.Monday);
                    endOfDate = StartOfWeek(today, DayOfWeek.Monday).AddMinutes(-1);
                    break;
                case "month":
                    startOfDate = new DateTime(today.Year, today.Month, 1).AddMonths(-1);
                    endOfDate = new DateTime(today.Year, today.Month, 1).AddMinutes(-1);
                    break;
                case "3month":
                    startOfDate = new DateTime(today.Year, today.Month, 1).AddMonths(-3);
                    endOfDate = new DateTime(today.Year, today.Month, 1).AddMinutes(-1);
                    break;
                default:
                    throw new AppException("Invalid type");
            }
        }

        public static Dictionary<string, int> CalculateBestStreaksForAllHabits(List<GHabitWithDates> habits)
        {
            var bestStreaks = new Dictionary<string, int>();

            foreach (var habit in habits)
            {
                int bestStreak = CalculateBestStreak(habit);
                bestStreaks[habit.GHabitId] = bestStreak;
            }

            return bestStreaks;
        }

        private static int CalculateBestStreak(GHabitWithDates gHabitWithDates)
        {
            var dates = gHabitWithDates.GHabitDates
                .OrderBy(d => d.DateOf)
                .Select(d => d.DateOf.Date) // Only consider the date part
                .ToList();

            if (dates.Count == 0) return 0;

            int currentStreak = 1;
            int maxStreak = 1;

            for (int i = 1; i < dates.Count; i++)
            {
                if (dates[i] == dates[i - 1].AddDays(1))
                {
                    currentStreak++;
                    if (currentStreak > maxStreak)
                    {
                        maxStreak = currentStreak;
                    }
                }
                else
                {
                    currentStreak = 1;
                }
            }

            return maxStreak;
        }

     
    }
}
