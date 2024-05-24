namespace bbetter.API.Models.Stats
{
    public class BHabitWithStats
    {
        public int BHabitId { get; set; }
        public int AccountId { get; set; }
        public string Content { get; set; }
        public DateTime IssueDate { get; set; }
        public DateTime LastDate { get; set; }
        public int NumOfEntries { get; set; }
        public double MaxInterval { get; set; }
        public double MinInterval { get; set; }
        public double AvgInterval { get; set; }
    }
}
