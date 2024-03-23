namespace bbetterApi.Models
{
    public class UserResponse
    {
        public int AccountId { get; set; }
        public string Username { get; set; }
        public string RefreshToken { get; set; }
        public string TokenCreated { get; set; }
        public string TokenExpires { get; set; }
    }
}
