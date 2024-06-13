using bbetter.API.Models.Responses;
using bbetter.API.Models.Stats;
using database.Models;

namespace bbetter.API.Utils
{
    public class TaskStatsUtil
    {
        public static TaskResponse FormTaskResponse(List<database.Models.Task> tasks)
        {
            return new TaskResponse
            {
                Tasks = tasks,
                Stats = CalculateTaskStats(tasks),
                ClosestTasks = FormClosestTasks(tasks)
            };
        }

        private static TaskStats CalculateTaskStats(List<database.Models.Task> tasks)
        {
            var totalCompletedTasks = tasks.Count(t => t.IsCompleted);

            var startOfWeek = StartOfWeek(DateTime.Now, DayOfWeek.Monday);
            var endOfWeek = startOfWeek.AddDays(7);

            var thisWeekIncompleteTasks = tasks.Count(t => !t.IsCompleted && t.Deadline >= startOfWeek && t.Deadline < endOfWeek);

            var thisWeekCompletedTasks = tasks.Count(t => t.IsCompleted && t.Deadline >= startOfWeek && t.Deadline < endOfWeek);

            var totalTasksWithDeadline = tasks.Count(t => t.IsCompleted);
            var tasksCompletedOnTime = tasks.Count(t => t.IsCompleted && t.CompleteDate <= t.Deadline);
            var onTimeCompletionPercentage = totalTasksWithDeadline > 0 ? (double)tasksCompletedOnTime / totalTasksWithDeadline * 100 : 0;

            return new TaskStats
            {
                NumOfCompleted = totalCompletedTasks,
                NumOfCompletedThisWeek = thisWeekCompletedTasks,
                NumOfNonCompletedThisWeek = thisWeekIncompleteTasks,
                PercOfInTimeCompletion = Math.Round(onTimeCompletionPercentage, 2),
            };
        }

        private static List<database.Models.Task> FormClosestTasks(List<database.Models.Task> tasks)
        {
            var currentDate = DateTime.Now;
            return tasks
            .Where(t => !t.IsCompleted && t.Deadline >= currentDate)
            .OrderBy(t => t.Deadline)  
            .Take(3)                    
            .ToList();                  
        }

        private static DateTime StartOfWeek(DateTime dt, DayOfWeek startOfWeek)
        {
            int diff = (7 + (dt.DayOfWeek - startOfWeek)) % 7;
            return dt.AddDays(-1 * diff).Date;
        }
    }
}
