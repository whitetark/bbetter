using bbetter.API.Models;
using bbetter.Database.Models;
using database.Models;

namespace bbetter.API.Utils
{
    public class HabitStatsUtil
    {
        public static GHabitStats CalculateGHabitStats(List<GHabitWithDates> habits)
        {
            var result = new GHabitStats
            {
                Streaks = CalculateBestStreaks(habits),
                WorkOn = CalculateHabitToWorkOn(habits),
                BestHabit = CalculateBestHabit(habits),
            };

            return result;
        }

        public static List<BHabitWithStats> CalculateBHabitStats(List<BHabitWithDates> habitsWithDates)
        {
            var result = new List<BHabitWithStats>();

            foreach (var habitWithDates in habitsWithDates)
            {
                var dates = habitWithDates.BHabitDates.OrderBy(hd => hd.DateOf).ToList();
                var intervals = dates.Zip(dates.Skip(1), (d1, d2) => d2.DateOf - d1.DateOf).ToList();

                var maxInterval = intervals.Any() ? intervals.Max() : TimeSpan.Zero;
                var minInterval = intervals.Any() ? intervals.Min() : TimeSpan.Zero;
                var numOfEntries = dates.Count;

                result.Add(new BHabitWithStats
                {
                    BHabitId = habitWithDates.BHabitId,
                    AccountId = habitWithDates.AccountId,
                    Content = habitWithDates.Content,
                    IssueDate = habitWithDates.IssueDate,
                    NumOfEntries = numOfEntries,
                    MaxInterval = maxInterval,
                    MinInterval = minInterval
                });
            }

            return result;
        }

        private static string CalculateBestHabit(List<GHabitWithDates> habits)
        {
            var bestHabit = habits.OrderByDescending(h => h.GHabitDates.Count).FirstOrDefault();
            return bestHabit.Content;
        }

        private static string CalculateHabitToWorkOn(List<GHabitWithDates> habits)
        {
            var worstHabit = habits.OrderBy(h => h.GHabitDates.Count).FirstOrDefault();
            return worstHabit.Content;
        }

        private static List<GHabitStreak> CalculateBestStreaks(List<GHabitWithDates> habits)
        {
            var bestStreaks = new List<GHabitStreak>();

            foreach (var habit in habits)
            {
                int bestStreak = CalculateBestStreak(habit);
                bestStreaks.Add(new GHabitStreak
                {
                    Content = habit.Content,
                    Streak = bestStreak
                });
            }

            return bestStreaks.OrderByDescending(h => h.Streak).ToList();
        }

        private static int CalculateBestStreak(GHabitWithDates gHabitWithDates)
        {
            var dates = gHabitWithDates.GHabitDates
                .OrderBy(d => d.DateOf)
                .Select(d => d.DateOf.Date)
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
