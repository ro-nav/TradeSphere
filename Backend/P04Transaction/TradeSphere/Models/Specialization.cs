using System;
using System.Collections.Generic;

namespace TradeSphere.Models
{
    public partial class Specialization
    {
        public Specialization()
        {
            Analysts = new HashSet<Analyst>();
        }

        public int SpecializationId { get; set; }
        public string SpecializationName { get; set; } = null!;

        public virtual ICollection<Analyst> Analysts { get; set; }
    }
}
