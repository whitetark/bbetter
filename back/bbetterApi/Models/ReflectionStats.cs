namespace bbetter.API.Models
{
    public class ReflectionStats
    {
        public int AccountId { get; set; }
        public string Advice { get; set; }
        public List<int> Emotions { get; set; }
        public List<int> Productivity { get; set; }
        public List<DateTime> Dates { get; set; }
    }
}
