namespace bbetterApi.Models
{
    public class Statistics
    {
        public int StatisticId { get; set; }
        public int AccountId { get; set; }
        public DateTime EntryDate { get; set; }
        public string Type {  get; set; }
        public double ProductivityCoef { get; set; }
        public double TaskCompletionRate {  get; set; }
        public int TaskCompeletedNum { get; set; }
        public int TaskCompletedExtra {  get; set; }
        public double GHabitCompletionRate {  get; set; }
        public int GHabitFullyCompleted { get; set; }
        public int WishesCompleteNum {  get; set; }
    }
}
