using database.Models;
using System.Text;

namespace bbetter.API.Utils
{
    public class PromptUtil
    {
        public static string TransformAccountActivitiesToString(AccountActivities accountActivities)
        {
            var lines = new List<string>();

            int counter = 1;

            foreach (var task in accountActivities.tasks)
            {
                string importance = task.IsImportant ? "important" : "not important";
                string urgency = task.IsUrgent ? "urgent" : "not urgent";
                lines.Add($"{counter}. {task.Content} isUrgent={urgency} isImportant={importance} Deadline={task.Deadline:yyyy-MM-dd} type=Task");
                counter++;
            }

            foreach (var wish in accountActivities.wishes)
            {
                lines.Add($"{counter}. {wish.Content} type=Wish");
                counter++;
            }

            foreach (var habit in accountActivities.ghabits)
            {
                lines.Add($"{counter}. {habit.Content} type=Good Habit");
                counter++;
            }
            lines.Add("Answer in this format:\r\nTop Three of All:\r\n- Activity_Content [Type]\r\n- Activity_Content [Type]\r\n- Activity_Content [Type]\r\nTop Three Tasks:\r\n- Activity_Content [Tasks]\r\n- Activity_Content [Tasks]\r\n- Activity_Content [Tasks];\r\nTop Three Wishes:\r\n- Activity_Content [Wish]\r\n- Activity_Content [Wish]\r\nActivity_Content [Wish]\r\nTop Three Good Habits:\r\n- Activity_Content [Good Habits]\r\n- Activity_Content [Good Habits]\r\n- Activity_Content [Good Habits]");
            lines.Add("I would like the response without additional details like urgency, importance, deadlines or order numbers. But you should add [Type] to every activity");

            return string.Join("\n", lines);
        }

        public static string TransformReflectionsToString(List<Reflection> reflections)
        {
            var result = new StringBuilder();
            result.AppendLine("User completes a test on self-reflections and here is his results:");

            foreach (var reflection in reflections.OrderByDescending(r => r.DateOf))
            {
                result.AppendLine($"{reflection.DateOf:dd-MM-yyyy} Emotion: {reflection.Emotion} Productivity: {reflection.Productivity}");
            }

            string advice = "What you advice can you give an user based on this info? Give me just conclusion in 200 characters and without any analysis. Straight advice";
            result.AppendLine("\n" + advice);

            string resultString = result.ToString();
            return resultString;
        }
    }
}
