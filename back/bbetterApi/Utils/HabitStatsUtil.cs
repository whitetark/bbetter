using bbetter.API.Models.Responses;
using bbetter.API.Models.Stats;
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

        public static BHabitResponse CalculateBHabitStats(List<BHabitWithDates> habitsWithDates)
        {
            var result = new List<BHabitWithStats>();
            DateTime now = DateTime.Now;

            foreach (var habitWithDates in habitsWithDates)
            {
                var dates = habitWithDates.BHabitDates.Select(hd => hd.DateOf).ToList();
                dates.Insert(0, habitWithDates.IssueDate);
                dates.Add(now);

                dates = dates.OrderBy(d => d).ToList();

                var intervals = dates.Zip(dates.Skip(1), (d1, d2) => d2 - d1).ToList();

                var maxInterval = intervals.Any() ? intervals.Max() : TimeSpan.Zero;
                var minInterval = intervals.Any() ? intervals.Min() : TimeSpan.Zero;
                var avgInterval = intervals.Any() ? TimeSpan.FromTicks((long)intervals.Average(ts => ts.Ticks)) : TimeSpan.Zero;
                var numOfEntries = dates.Count - 1;

                result.Add(new BHabitWithStats
                {
                    BHabitId = habitWithDates.BHabitId,
                    AccountId = habitWithDates.AccountId,
                    Content = habitWithDates.Content,
                    IssueDate = habitWithDates.IssueDate,
                    LastDate = habitWithDates.LastDate,
                    NumOfEntries = numOfEntries,
                    MaxInterval = maxInterval.TotalMilliseconds,
                    MinInterval = minInterval.TotalMilliseconds,
                    AvgInterval = avgInterval.TotalMilliseconds,
                });
            }

            var bestBadHabit = result.OrderByDescending(h => h.AvgInterval).FirstOrDefault();
            var habitToWorkOn = result.OrderBy(h => h.AvgInterval).FirstOrDefault();

            return new BHabitResponse
            {
                BHabits = result,
                BestBHabit = bestBadHabit.Content,
                WorstBHabit = habitToWorkOn.Content,
            };
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
