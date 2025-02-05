using System;
using System.Collections.Generic;

namespace TradeSphere.Models
{
    public partial class VirtualWallet
    {
        public int WalletId { get; set; }
        public int UserId { get; set; }
        public decimal Balance { get; set; }
        public DateTime? LastUpdated { get; set; }

        public virtual User User { get; set; } = null!;
    }
}
