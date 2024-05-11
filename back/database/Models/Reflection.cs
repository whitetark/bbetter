using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace database.Models
{
    public class Reflection
    {
        public int ReflectionId {  get; set; }
        public int AccountId { get; set; }
        public DateTime DateOf {  get; set; }
        public int Emotion {  get; set; }
        public int Productivity { get; set; }
        public string? ThreeWords { get; set; }
        public string? UserGoal { get; set; }
    }
}
