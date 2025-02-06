using System;
using System.Collections.Generic;

namespace TradeSphere.Models
{
    public partial class Analyst
    {
        public Analyst()
        {
            Posts = new HashSet<Post>();
        }

        public int AnalystId { get; set; }
        public int? UserId { get; set; }
        public int? SpecializationId { get; set; }
        public bool? IsApproved { get; set; }

        public virtual Specialization? Specialization { get; set; }
        public virtual User? User { get; set; }
        public virtual ICollection<Post> Posts { get; set; }
    }
}
