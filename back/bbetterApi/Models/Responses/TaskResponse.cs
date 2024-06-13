using bbetter.API.Models.Stats;

namespace bbetter.API.Models.Responses
{
    public class TaskResponse
    {
        public List<database.Models.Task> Tasks { get; set;}
        public TaskStats Stats { get; set;}
        public List<database.Models.Task> ClosestTasks { get; set;}
    }
}
