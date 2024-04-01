using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace database.Models
{
    public class Task
    {
        public int TaskId { get; set; }
        public int AccountId { get; set; }
        public string Content { get; set; }
        public bool IsUrgent { get; set; }
        public bool IsImportant { get; set; }
        public DateTime Deadline { get; set; }
        public bool IsCompleted {  get; set; }
    }
}
