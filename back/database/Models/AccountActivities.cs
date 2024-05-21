using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace database.Models
{
    public class AccountActivities
    {
        public int accountId { get; set; }
        public List<Task> tasks {  get; set; }
        public List<Wish> wishes { get; set; }
        public List<GHabitWithDates> ghabits { get; set;}

        public int GetTotalActivities()
        {
            int taskCount = tasks?.Count ?? 0;
            int wishCount = wishes?.Count ?? 0;
            int ghabitCount = ghabits?.Count ?? 0;

            return taskCount + wishCount + ghabitCount;
        }
    }
}
