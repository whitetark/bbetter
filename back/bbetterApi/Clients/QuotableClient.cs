using bbetter.API.Models.Clients;
using bbetterApi.Models;
using Newtonsoft.Json;

namespace bbetterApi.Clients
{
    public class QuotableClient
    {
        private readonly HttpClient _httpClient;
        private static string? _baseUrl;

        public QuotableClient(IConfiguration configuration) {

            _baseUrl = configuration.GetValue<string>("quotableURL");

            _httpClient = new HttpClient
            {
                BaseAddress = new Uri(_baseUrl)
            };
        }

        public async Task<Quote> GetRandomQuote()
        {
            try
            {
                var response = await _httpClient.GetAsync($"quotes/random?limit=1&maxLength=160").ConfigureAwait(false);
                response.EnsureSuccessStatusCode();
                var content = response.Content.ReadAsStringAsync().Result;

                var resultOfDes = JsonConvert.DeserializeObject<List<QuotableItem>>(content);

                var quote = new Quote
                {
                    QuoteId = resultOfDes.First()._id,
                    Content = resultOfDes.First().content,
                    Author = resultOfDes.First().author,
                };

                return quote;
            } catch (Exception ex)
            {
                throw new ArgumentException("err", ex);
            }
        }

        public async Task<Quote> GetQuoteById(string id)
        {
            try
            {
                var response = await _httpClient.GetAsync($"quotes/{id}").ConfigureAwait(false);
                response.EnsureSuccessStatusCode();
                var content = response.Content.ReadAsStringAsync().Result;

                var resultOfDes = JsonConvert.DeserializeObject<QuotableItem>(content);

                var quote = new Quote
                {
                    QuoteId = resultOfDes._id,
                    Content = resultOfDes.content,
                    Author = resultOfDes.author,
                };

                return quote;
            }
            catch (Exception ex)
            {
                throw new ArgumentException("err", ex);
            }
        }

        public async Task<Quote> GetMotivationalQuote()
        {
            try
            {
                var response = await _httpClient.GetAsync($"quotes/random?tags=Inspirational&maxLength=240&limit=1").ConfigureAwait(false);
                response.EnsureSuccessStatusCode();
                var content = response.Content.ReadAsStringAsync().Result;

                var resultOfDes = JsonConvert.DeserializeObject<List<QuotableItem>>(content);

                var quote = new Quote
                {
                    QuoteId = resultOfDes.First()._id,
                    Content = resultOfDes.First().content,
                    Author = resultOfDes.First().author,
                };

                return quote;
            }
            catch (Exception ex)
            {
                throw new ArgumentException("err", ex);
            }
        }
    }
}
