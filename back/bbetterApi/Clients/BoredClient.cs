using bbetterApi.Models;
using database.Models;
using Newtonsoft.Json;

namespace bbetterApi.Clients
{
    public class BoredClient
    {
        private readonly HttpClient _httpClient;
        private static string? _baseUrl;

        public BoredClient(IConfiguration configuration)
        {
            _baseUrl = configuration["boredURL"];

            _httpClient = new HttpClient
            {
                BaseAddress = new Uri(_baseUrl)
            };
        }

        public async Task<BoredItem> GetRandomActivity()
        {
            try
            {
                var response = await _httpClient.GetAsync($"api/activity?participants=1");
                response.EnsureSuccessStatusCode();
                var content = response.Content.ReadAsStringAsync().Result;

                var resultOfDes = JsonConvert.DeserializeObject<BoredItem>(content);

                return resultOfDes;

            } catch (Exception ex)
            {
                return null;
            }
        }

    }
}
