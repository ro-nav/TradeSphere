using System;
using System.Collections.Generic;

namespace TradeSphere.Models
{
    public partial class Marketsentiment
    {
        public int SentimentId { get; set; }
        public string SourceType { get; set; } = null!;
        public int? StockId { get; set; }
        public decimal? SentimentScore { get; set; }
        public DateTime? SentimentDate { get; set; }

        public virtual Stock? Stock { get; set; }
    }
}
