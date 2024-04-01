using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace database.Models
{
    public class Quote
    {
        public int QuoteId { get; set; }
        public string Author { get; set; }
        public string Content {  get; set; }
    }
}
