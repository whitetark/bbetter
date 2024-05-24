namespace bbetter.API.Models.Responses
{
    public class WhatToDoResponse
    {
        public int accountId { get; set; }
        public List<WhatToDoItem> topThree { get; set; }
        public List<WhatToDoItem> topTasks { get; set; }
        public List<WhatToDoItem> topWishes { get; set; }
        public List<WhatToDoItem> topGhabits { get; set; }
    }

    public class WhatToDoItem
    {
        public string Content { get; set; }
        public string Type { get; set; }
    }
}
