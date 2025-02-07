using System;
using System.Collections.Generic;

namespace TradeSphere.Models
{
    public partial class Transaction
    {
        public int TransactionId { get; set; }
        public int? UserId { get; set; }
        public int? StockId { get; set; }
        public string TransactionType { get; set; } = null!;
        public int Quantity { get; set; }
        public decimal PriceAtTransaction { get; set; }
        public DateTime? TransactionDate { get; set; }

        public virtual Stock? Stock { get; set; }
        public virtual User? User { get; set; }
    }
}
