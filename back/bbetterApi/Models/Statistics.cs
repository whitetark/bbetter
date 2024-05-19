namespace bbetterApi.Models
{
    public class Statistics
    {
        public int AccountId { get; set; }
        public DateTime EntryDate { get; set; }
        public string Type {  get; set; }
        public double ProductivityCoef { get; set; }
        public double TaskCompletionRate {  get; set; }
        public double TaskCompletedNum { get; set; }
        public double TaskCompletedExtra {  get; set; }
        public double GHabitCompletionRate {  get; set; }
        public double GHabitFullyCompleted { get; set; }
        public double WishesCompleteNum {  get; set; }
    }
}
