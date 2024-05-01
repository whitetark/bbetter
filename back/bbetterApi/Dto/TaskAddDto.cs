namespace bbetterApi.Dto
{
    public class TaskAddDto
    {
        public int AccountId { get; set; }
        public string Content { get; set; }
        public bool IsUrgent { get; set; }
        public bool IsImportant { get; set; }
        public DateTime Deadline { get; set; } = DateTime.Now;
        public bool IsCompleted { get; set; } = false;
    }
}
