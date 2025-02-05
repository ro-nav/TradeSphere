using System;
using System.Collections.Generic;

namespace TradeSphere.Models
{
    public partial class Role
    {
        public Role()
        {
            Users = new HashSet<User>();
        }

        public int RoleId { get; set; }
        public string Type { get; set; } = null!;

        public virtual ICollection<User> Users { get; set; }
    }
}
