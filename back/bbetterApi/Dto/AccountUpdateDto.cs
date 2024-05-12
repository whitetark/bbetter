using database.Models;

namespace bbetterApi.Dto
{
    public class AccountUpdateDto
    {
        public int AccountId { get; set; }
        public string Username { get; set; } = string.Empty;
        public string RefreshToken { get; set; } = string.Empty;
        public DateTime TokenCreated { get; set; }
        public DateTime TokenExpires { get; set; }
        public string QuoteOfDayId { get; set; } = string.Empty;
        public DateTime QuoteExpires { get; set; } = DateTime.Now;
    }
}