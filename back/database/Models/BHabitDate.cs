using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace database.Models
{
    public class BHabitDate
    {
        public int BHabitDateId {  get; set; }
        public int BHabitId { get; set; }
        public DateOnly DateOf {  get; set; }
    }
}
