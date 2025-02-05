using System;
using System.Collections.Generic;

namespace TradeSphere.Models
{
    public partial class Auditlog
    {
        public int LogId { get; set; }
        public int? UserId { get; set; }
        public string ActionPerformed { get; set; } = null!;
        public DateTime? ActionDate { get; set; }

        public virtual User? User { get; set; }
    }
}
