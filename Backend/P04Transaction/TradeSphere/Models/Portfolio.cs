using System;
using System.Collections.Generic;

namespace TradeSphere.Models
{
    public partial class Portfolio
    {
        public int PortfolioId { get; set; }
        public int UserId { get; set; }
        public int StockId { get; set; }
        public int Quantity { get; set; }
        public decimal AvgPurchasePrice { get; set; }
        public decimal TotalInvestment { get; set; }
        public decimal? CumulativeProfitLoss { get; set; }
        public string? Status { get; set; }
        public DateTime LastUpdated { get; set; }

        public virtual Stock Stock { get; set; } = null!;
        public virtual User User { get; set; } = null!;
    }
}
