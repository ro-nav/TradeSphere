using System;
using System.Collections.Generic;

namespace TradeSphere.Models
{
    public partial class UserToken
    {
        public int Id { get; set; }
        public string? ClientCode { get; set; }
        public string? JwtToken { get; set; }
        public string? RefreshToken { get; set; }
        public string? FeedToken { get; set; }
        public DateTime? CreatedAt { get; set; }
    }
}
