﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace database.Models
{
    public class GHabitWithDates
    {
        public string GHabitId { get; set; }
        public int AccountId { get; set; }
        public string Content { get; set; }
        public int priorityOf {  get; set; }
        public ICollection<GHabitWeekResult> GHabitDates { get; set; }
    }
}
