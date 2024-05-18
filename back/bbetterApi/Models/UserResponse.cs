namespace bbetterApi.Models
{
    public class UserResponse
    {
        public int AccountId { get; set; }
        public string Username { get; set; }
        public string QuoteOfDayId { get; set; }
        public DateTime QuoteExpires { get; set; }
    }
}
