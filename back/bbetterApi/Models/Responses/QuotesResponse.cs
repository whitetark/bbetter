using database.Models;

namespace bbetter.API.Models.Responses
{
    public class QuotesResponse
    {
        public List<UserQuote> Quotes { get; set; }
        public List<QuoteType> TypesOf { get; set; }
    }

    public class QuoteType
    {
        public string TypeOf { get; set; }
        public int Count { get; set; }
    }
}
