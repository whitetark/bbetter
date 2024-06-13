namespace bbetter.API.Models.Stats
{
    public class TaskStats
    {
        public int NumOfCompletedThisWeek { get; set; }
        public int NumOfNonCompletedThisWeek { get; set; }
        public int NumOfCompleted {  get; set; }
        public double PercOfInTimeCompletion { get; set; }
    }
}
