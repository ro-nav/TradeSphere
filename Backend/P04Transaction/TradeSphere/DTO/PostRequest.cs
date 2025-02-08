namespace TradeSphere.DTO
{
    public class PostRequest
    {
        public int StockId { get; set; }
        public int UserId { get; set; }
        public string Title { get; set; } = null!;
        public string Content { get; set; } = null!;
    }
}
