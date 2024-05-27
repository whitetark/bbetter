using bbetterApi.Models;
using database.Models;
using OpenAI_API.Models;

namespace bbetter.API.Clients
{
    public class GPTClient
    {
        private static string? _apiKey;

        public GPTClient(IConfiguration configuration)
        {
            _apiKey = configuration.GetValue<string>("openAIKey");
        }

        public async Task<string?> GetWhatToDo(string prompt)
        {
            try
            {
                var api = new OpenAI_API.OpenAIAPI(_apiKey);
                var chat = api.Chat.CreateConversation();
                chat.Model = Model.ChatGPTTurbo;
                chat.RequestParameters.Temperature = 0.5;

                string testPrompt1 = "I have activities like this:\r\n\r\nScenario isUrgent=urgent isImportant=not important Deadline=2024-05-25 type=Task\r\nDiploma FrontEnd isUrgent=urgent isImportant=important Deadline=2024-05-18 type=Task\r\nPagination isUrgent=urgent isImportant=not important Deadline=2024-05-27 type=Task\r\nWorking isUrgent=not urgent isImportant=important Deadline=2024-05-27 type=Task\r\nVisit Pinchuk Art Center type=Wish\r\nLearn how to play chess type=Wish\r\nWatch a movie you'd never usually watch type=Wish\r\nLearn origami type=Wish\r\nMake a bucket list type=Wish\r\nRearrange and organize your room type=Wish\r\nMake a to-do list for your week type=Wish\r\nListen to your favorite album type=Wish\r\nVolunteer at your local food bank type=Wish\r\nGo to the library and find an interesting book type=Wish\r\nLearn how to use a french press type=Wish\r\nSmoking type=Good Habit\r\nWalking type=Good Habit\r\nExercises type=Good Habit\r\nReading type=Good Habit\r\nCan you recommend me what to do based on all information? Answer in this format:\r\nTop Three of All:\r\n\r\nActivity_Content [Type];\r\nActivity_Content [Type];\r\nActivity_Content [Type];\r\nTop Three Tasks:\r\n\r\nActivity_Content [Tasks];\r\nActivity_Content [Tasks];\r\nActivity_Content [Tasks];\r\nTop Three Wishes:\r\n\r\nActivity_Content [Wish];\r\nActivity_Content [Wish];\r\nActivity_Content [Wish];\r\nTop Three Good Habits:\r\n\r\nActivity_Content [Good Habits];\r\nActivity_Content [Good Habits];\r\nActivity_Content [Good Habits];\r\n\r\n\r\n";
                string testResponse1 = "Top Three of All:\r\n- Diploma FrontEnd [Task]\r\n- Working [Task] \r\n- Exercises [Good Habit]\r\nTop Three Tasks:\r\n- Diploma FrontEnd [Task] \r\n- Working [Task] \r\n- Scenario [Task] \r\nTop Three Wishes:\r\n- Visit Pinchuk Art Center [Wish]\r\n- Learn how to play chess [Wish]\r\n- Watch a movie you'd never usually watch [Wish]\r\nTop Three Good Habits:\r\n- Exercises [Good Habit]\r\n- Reading [Good Habit]\r\n- Walking [Good Habit]";

                chat.AppendUserInput(testPrompt1);
                chat.AppendExampleChatbotOutput(testResponse1);

                chat.AppendUserInput(prompt);

                string response = await chat.GetResponseFromChatbotAsync().ConfigureAwait(false);
                return response;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<string?> GetReflectionRecommendation(string prompt)
        {
            try
            {
                var api = new OpenAI_API.OpenAIAPI(_apiKey);
                var chat = api.Chat.CreateConversation();
                chat.Model = Model.ChatGPTTurbo;
                chat.RequestParameters.Temperature = 1;

                chat.AppendUserInput(prompt);

                string response = await chat.GetResponseFromChatbotAsync().ConfigureAwait(false);
                return response;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
