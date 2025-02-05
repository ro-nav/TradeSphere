using System;
using System.Collections.Generic;

namespace TradeSphere.Models
{
    public partial class Rating
    {
        public int RatingId { get; set; }
        public int CommentId { get; set; }
        public string Rating1 { get; set; } = null!;
        public DateTime? RatedAt { get; set; }

        public virtual Comment Comment { get; set; } = null!;
    }
}
