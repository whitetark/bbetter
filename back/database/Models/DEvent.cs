using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace bbetter.Database.Models
{
    public class DEvent
    {
        public int DEventId { get; set; }
        public int AccountId { get; set; }
        public DateTime DateOf {  get; set; }
        public int Rating { get; set; }
        public string WhatHappened { get; set; }
    }
}
