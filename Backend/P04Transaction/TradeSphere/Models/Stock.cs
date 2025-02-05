using System;
using System.Collections.Generic;

namespace TradeSphere.Models
{
    public partial class Stock
    {
        public Stock()
        {
            Comments = new HashSet<Comment>();
            Marketsentiments = new HashSet<Marketsentiment>();
            Portfolios = new HashSet<Portfolio>();
            Transactions = new HashSet<Transaction>();
        }

        public int StockId { get; set; }
        public string StockSymbol { get; set; } = null!;
        public int StockToken { get; set; }
        public string ExchangeType { get; set; } = null!;
        public double? Ltp { get; set; }

        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<Marketsentiment> Marketsentiments { get; set; }
        public virtual ICollection<Portfolio> Portfolios { get; set; }
        public virtual ICollection<Transaction> Transactions { get; set; }
    }
}
