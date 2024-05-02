namespace bbetterApi.Dto
{
    public class WishAddDto
    {
        public int AccountId { get; set; }
        public string Content { get; set; }
        public bool IsCompleted { get; set; } = false;
    }
}
