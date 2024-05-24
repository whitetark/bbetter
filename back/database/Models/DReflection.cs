using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace bbetter.Database.Models
{
    public class DReflection
    {
        public int DReflectionId { get; set; }
        public int AccountId {  get; set; }
        public DateTime DateOf {  get; set; }
        public string Recap { get; set; }
        public string Times {  get; set; }
    }
}
