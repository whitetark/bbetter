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
        public List<AccountTasks> tasks {  get; set; }
        public List<AccountWishes> wishes { get; set; }
        public List<GHabitWithDates> ghabits { get; set;}
    }

    public class AccountTasks
    {
        public int TaskId { get; set; }
        public string Content { get; set; }
        public bool IsUrgent { get; set; }
        public bool IsImportant { get; set; }
        public DateTime Deadline { get; set; }
    }

    public class AccountWishes
    {
        public int WishId { get; set; }
        public string Content { get; set; }
    }
}
