using System;
using System.Collections.Generic;

namespace TradeSphere.Models
{
    public partial class Comment
    {
        public Comment()
        {
            Ratings = new HashSet<Rating>();
        }

        public int CommentId { get; set; }
        public int StockId { get; set; }
        public int AnalystId { get; set; }
        public DateTime? Datetime { get; set; }
        public string CommentText { get; set; } = null!;

        public virtual Analyst Analyst { get; set; } = null!;
        public virtual Stock Stock { get; set; } = null!;
        public virtual ICollection<Rating> Ratings { get; set; }
    }
}
