using System;
using System.Collections.Generic;

namespace TradeSphere.Models
{
    public partial class Trader
    {
        public int TraderId { get; set; }
        public int UserId { get; set; }
        public string BankAccountNumber { get; set; } = null!;
        public string IfscCode { get; set; } = null!;

        public virtual User User { get; set; } = null!;
    }
}
