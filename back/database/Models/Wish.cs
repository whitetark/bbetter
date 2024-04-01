using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;

namespace database.Models
{
    public class Wish
    {
        public int WishId { get; set; }
        public int AccountId { get; set; }
        public string Content {  get; set; }
        public bool IsCompleted { get; set; }
    }
}
