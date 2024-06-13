using bbetter.API.Models.Stats;
using bbetterApi.Models;

namespace bbetter.API.Models.Responses
{
    public class BHabitResponse
    {
        public List<BHabitWithStats> BHabits { get; set; }
        public string BestBHabit { get; set; }
        public string WorstBHabit { get; set; }
        public Quote Quote {  get; set; }
    }
}
