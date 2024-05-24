using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace database.Models
{
    public class BHabit
    {
        public int BHabitId { get; set; }
        public int AccountId { get; set; }
        public string Content { get; set; }
        public DateTime IssueDate { get; set; }
        public DateTime LastDate { get; set; }
    }
}
