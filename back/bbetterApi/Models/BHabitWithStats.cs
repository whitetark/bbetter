namespace bbetter.API.Models
{
    public class BHabitWithStats
    {
        public int BHabitId { get; set; }
        public int AccountId { get; set; }
        public string Content { get; set; }
        public DateTime IssueDate { get; set; }
        public int NumOfEntries { get; set; }
        public TimeSpan MaxInterval { get; set; }
        public TimeSpan MinInterval {  get; set; }
    }
}
