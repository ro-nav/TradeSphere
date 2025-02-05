using System;
using System.Collections.Generic;

namespace TradeSphere.Models
{
    public partial class Analyst
    {
        public Analyst()
        {
            Comments = new HashSet<Comment>();
        }

        public int AnalystId { get; set; }
        public int? UserId { get; set; }
        public int? SpecializationId { get; set; }
        public bool? IsApproved { get; set; }

        public virtual Specialization? Specialization { get; set; }
        public virtual User? User { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
    }
}
