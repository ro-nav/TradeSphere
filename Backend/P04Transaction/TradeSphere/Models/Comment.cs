using System;
using System.Collections.Generic;

namespace TradeSphere.Models
{
    public partial class Comment
    {
        public int CommentId { get; set; }
        public int PostId { get; set; }
        public int TraderId { get; set; }
        public string Text { get; set; } = null!;
        public DateTime? CommentDate { get; set; }

        public virtual Post Post { get; set; } = null!;
        public virtual Trader Trader { get; set; } = null!;
    }
}
