namespace TradeSphere.DTO
{
    // Request model for Buy and Sell Transactions
    public class TransactionRequest
    {
        public int UserId { get; set; }
        public int StockId { get; set; }
        public int Quantity { get; set; }
        public decimal PriceAtTransaction { get; set; }
    }
}
