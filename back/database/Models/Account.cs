using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace database.Models
{
    public class Account
    {
        public int AccountId { get; set; }
        public string Username { get; set; }
        public string PasswordHash { get; set; }
        public string RefreshToken { get; set; }
        public DateTime TokenCreated { get; set; }
        public DateTime TokenExpires { get; set; }
        public string QuoteOfDayId { get; set; }
        public DateTime QuoteExpires { get; set; }
        public bool isUserQuote { get; set; }
    }
}