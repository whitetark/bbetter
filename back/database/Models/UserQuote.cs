﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace database.Models
{
    public class UserQuote
    {
        public int UserQuoteId { get; set; }
        public int AccountId { get; set; }
        public string Author { get; set; }
        public string Quote {  get; set; }
        public string TypeOf { get; set; }
    }
}
