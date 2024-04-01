using database.Models;

namespace bbetterApi.Models
{
    public class AccountUpdateDto
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string RefreshToken { get; set; } = string.Empty;
        public string TokenCreated { get; set; }
        public string TokenExpires { get; set; }
    }
}