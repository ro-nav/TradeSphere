using System;
using System.Collections.Generic;

namespace TradeSphere.Models
{
    public partial class User
    {
        public User()
        {
            Analysts = new HashSet<Analyst>();
            Portfolios = new HashSet<Portfolio>();
            Transactions = new HashSet<Transaction>();
            VirtualWallets = new HashSet<VirtualWallet>();
        }

        public int UserId { get; set; }
        public int? RoleId { get; set; }
        public string Username { get; set; } = null!;
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string? ContactNumber { get; set; }
        public string Email { get; set; } = null!;
        public DateOnly? DateOfBirth { get; set; }
        public string? PanCardNumber { get; set; }
        public string PasswordHash { get; set; } = null!;
        public string? Status { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public string? ResetToken { get; set; }
        public DateTime? TokenExpiry { get; set; }

        public virtual Role? Role { get; set; }
        public virtual Trader? Trader { get; set; }
        public virtual ICollection<Analyst> Analysts { get; set; }
        public virtual ICollection<Portfolio> Portfolios { get; set; }
        public virtual ICollection<Transaction> Transactions { get; set; }
        public virtual ICollection<VirtualWallet> VirtualWallets { get; set; }
    }
}
