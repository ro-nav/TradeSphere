using System;
using System.Collections.Generic;

namespace TradeSphere.Models
{
    public partial class Post
    {
        public Post()
        {
            Comments = new HashSet<Comment>();
        }

        public int PostId { get; set; }
        public int StockId { get; set; }
        public int AnalystId { get; set; }
        public string Title { get; set; } = null!;
        public string Content { get; set; } = null!;
        public DateTime? Datetime { get; set; }
        public int? Likes { get; set; }

        public virtual Analyst Analyst { get; set; } = null!;
        public virtual Stock Stock { get; set; } = null!;
        public virtual ICollection<Comment> Comments { get; set; }
    }
}
