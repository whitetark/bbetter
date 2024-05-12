namespace bbetterApi.Models
{
    public class UserResponse
    {
        public int AccountId { get; set; }
        public string Username { get; set; }
        public string RefreshToken { get; set; }
        public DateTime TokenCreated { get; set; }
        public DateTime TokenExpires { get; set; }
        public string QuoteOfDayId { get; set; }
        public DateTime QuoteExpires { get; set; }
    }
}
