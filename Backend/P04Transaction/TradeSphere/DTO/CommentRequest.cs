namespace TradeSphere.DTO
{
    public class CommentRequest
    {
        public int TraderId { get; set; }
        public string Text { get; set; } = null!;
    }
}
