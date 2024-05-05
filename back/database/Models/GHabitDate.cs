using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace database.Models
{
    public class GHabitDate
    {
        public int GHabitDateId { get; set; }
        public int GHabitId { get; set; }
        public DateTime DateOf { get; set; }
    }
}
