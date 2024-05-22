namespace bbetter.API.Models
{
    public class GHabitStats
    {
        public string WorkOn { get; set; }
        public string BestHabit { get; set; }
        public List<GHabitStreak> Streaks { get; set; }
    }

    public class GHabitStreak
    {
        public string Content { get; set; }
        public int Streak {  get; set; }
    } 
}
