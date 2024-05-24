using database.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace bbetter.Database.Models
{
    public class BHabitWithDates
    {
        public int BHabitId { get; set; }
        public int AccountId { get; set; }
        public string Content { get; set; }
        public DateTime IssueDate { get; set; }
        public List<BHabitDate> BHabitDates { get; set; }
    }
}
