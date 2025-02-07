namespace TradeSphere.DTO
{
    // Request model for AddBalance and WithdrawBalance
    public class WalletRequest
    {
        public int UserId { get; set; }
        public decimal Amount { get; set; }
    }
}
