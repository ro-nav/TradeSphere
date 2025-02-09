using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace TradeSphere.Models
{
    public partial class p04_tradespherdbContext : DbContext
    {
        public p04_tradespherdbContext()
        {
        }

        public p04_tradespherdbContext(DbContextOptions<p04_tradespherdbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Analyst> Analysts { get; set; } = null!;
        public virtual DbSet<Comment> Comments { get; set; } = null!;
        public virtual DbSet<Marketsentiment> Marketsentiments { get; set; } = null!;
        public virtual DbSet<Portfolio> Portfolios { get; set; } = null!;
        public virtual DbSet<Post> Posts { get; set; } = null!;
        public virtual DbSet<Role> Roles { get; set; } = null!;
        public virtual DbSet<Specialization> Specializations { get; set; } = null!;
        public virtual DbSet<Stock> Stocks { get; set; } = null!;
        public virtual DbSet<Trader> Traders { get; set; } = null!;
        public virtual DbSet<Transaction> Transactions { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;
        public virtual DbSet<UserToken> UserTokens { get; set; } = null!;
        public virtual DbSet<VirtualWallet> VirtualWallets { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                // Load the configuration
                IConfigurationRoot configuration = new ConfigurationBuilder()
                    .SetBasePath(AppContext.BaseDirectory)
                    .AddJsonFile("appsettings.json")
                    .Build();

                // Get the connection string from configuration
                var connectionString = configuration.GetConnectionString("DefaultConnection");

                optionsBuilder.UseMySql(connectionString, Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.39-mysql"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseCollation("utf8mb4_0900_ai_ci")
                .HasCharSet("utf8mb4");

            modelBuilder.Entity<Analyst>(entity =>
            {
                entity.ToTable("analysts");

                entity.HasIndex(e => e.SpecializationId, "analysts_specialization_fk");

                entity.HasIndex(e => e.UserId, "user_id");

                entity.Property(e => e.AnalystId).HasColumnName("analyst_id");

                entity.Property(e => e.IsApproved)
                    .HasColumnName("is_approved")
                    .HasDefaultValueSql("'0'");

                entity.Property(e => e.SpecializationId).HasColumnName("specialization_id");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.Specialization)
                    .WithMany(p => p.Analysts)
                    .HasForeignKey(d => d.SpecializationId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("analysts_specialization_fk");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Analysts)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("analysts_ibfk_1");
            });

            modelBuilder.Entity<Comment>(entity =>
            {
                entity.ToTable("comment");

                entity.HasIndex(e => e.PostId, "FK_Comment_Post");

                entity.HasIndex(e => e.TraderId, "FK_Comment_Trader");

                entity.Property(e => e.CommentId).HasColumnName("comment_id");

                entity.Property(e => e.CommentDate)
                    .HasColumnType("datetime")
                    .HasColumnName("comment_date")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.PostId).HasColumnName("post_id");

                entity.Property(e => e.Text).HasMaxLength(255);

                entity.Property(e => e.TraderId).HasColumnName("trader_id");

                entity.HasOne(d => d.Post)
                    .WithMany(p => p.Comments)
                    .HasForeignKey(d => d.PostId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Comment_Post");

                entity.HasOne(d => d.Trader)
                    .WithMany(p => p.Comments)
                    .HasForeignKey(d => d.TraderId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Comment_Trader");
            });

            modelBuilder.Entity<Marketsentiment>(entity =>
            {
                entity.HasKey(e => e.SentimentId)
                    .HasName("PRIMARY");

                entity.ToTable("marketsentiment");

                entity.HasIndex(e => e.StockId, "stock_id");

                entity.Property(e => e.SentimentId).HasColumnName("sentiment_id");

                entity.Property(e => e.SentimentDate)
                    .HasColumnType("timestamp")
                    .HasColumnName("sentiment_date")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.SentimentScore)
                    .HasPrecision(3, 2)
                    .HasColumnName("sentiment_score");

                entity.Property(e => e.SourceType)
                    .HasColumnType("enum('News','Social Media','Reports')")
                    .HasColumnName("source_type");

                entity.Property(e => e.StockId).HasColumnName("stock_id");

                entity.HasOne(d => d.Stock)
                    .WithMany(p => p.Marketsentiments)
                    .HasForeignKey(d => d.StockId)
                    .HasConstraintName("marketsentiment_ibfk_1");
            });

            modelBuilder.Entity<Portfolio>(entity =>
            {
                entity.ToTable("portfolio");

                entity.HasIndex(e => e.StockId, "stock_id");

                entity.HasIndex(e => e.UserId, "user_id");

                entity.Property(e => e.PortfolioId).HasColumnName("portfolio_id");

                entity.Property(e => e.AvgPurchasePrice)
                    .HasPrecision(15, 2)
                    .HasColumnName("avg_purchase_price");

                entity.Property(e => e.CumulativeProfitLoss)
                    .HasPrecision(15, 2)
                    .HasColumnName("cumulative_profit_loss");

                entity.Property(e => e.LastUpdated)
                    .HasColumnType("datetime")
                    .HasColumnName("last_updated");

                entity.Property(e => e.Quantity).HasColumnName("quantity");

                entity.Property(e => e.Status)
                    .HasColumnType("enum('Active','SoldOut')")
                    .HasColumnName("status")
                    .HasDefaultValueSql("'Active'");

                entity.Property(e => e.StockId).HasColumnName("stock_id");

                entity.Property(e => e.TotalInvestment)
                    .HasPrecision(15, 2)
                    .HasColumnName("total_investment");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.Stock)
                    .WithMany(p => p.Portfolios)
                    .HasForeignKey(d => d.StockId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("portfolio_ibfk_2");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Portfolios)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("portfolio_ibfk_1");
            });

            modelBuilder.Entity<Post>(entity =>
            {
                entity.ToTable("posts");

                entity.HasIndex(e => e.AnalystId, "analyst_id");

                entity.HasIndex(e => e.StockId, "stock_id");

                entity.Property(e => e.PostId).HasColumnName("post_id");

                entity.Property(e => e.AnalystId).HasColumnName("analyst_id");

                entity.Property(e => e.Content)
                    .HasColumnType("text")
                    .HasColumnName("content");

                entity.Property(e => e.Datetime)
                    .HasColumnType("datetime")
                    .HasColumnName("datetime")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.Likes)
                    .HasColumnName("likes")
                    .HasDefaultValueSql("'0'");

                entity.Property(e => e.StockId).HasColumnName("stock_id");

                entity.Property(e => e.Title)
                    .HasMaxLength(255)
                    .HasColumnName("title");

                entity.HasOne(d => d.Analyst)
                    .WithMany(p => p.Posts)
                    .HasForeignKey(d => d.AnalystId)
                    .HasConstraintName("posts_ibfk_2");

                entity.HasOne(d => d.Stock)
                    .WithMany(p => p.Posts)
                    .HasForeignKey(d => d.StockId)
                    .HasConstraintName("posts_ibfk_1");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("roles");

                entity.HasIndex(e => e.Type, "type")
                    .IsUnique();

                entity.Property(e => e.RoleId).HasColumnName("role_id");

                entity.Property(e => e.Type).HasColumnName("type");
            });

            modelBuilder.Entity<Specialization>(entity =>
            {
                entity.ToTable("specialization");

                entity.HasIndex(e => e.SpecializationName, "specialization_name")
                    .IsUnique();

                entity.Property(e => e.SpecializationId).HasColumnName("specialization_id");

                entity.Property(e => e.SpecializationName).HasColumnName("specialization_name");
            });

            modelBuilder.Entity<Stock>(entity =>
            {
                entity.ToTable("stocks");

                entity.HasIndex(e => e.StockToken, "stock_token")
                    .IsUnique();

                entity.Property(e => e.StockId).HasColumnName("stock_id");

                entity.Property(e => e.ExchangeType)
                    .HasMaxLength(255)
                    .HasColumnName("exchange_type");

                entity.Property(e => e.Ltp).HasColumnName("ltp");

                entity.Property(e => e.StockSymbol)
                    .HasMaxLength(255)
                    .HasColumnName("stock_symbol");

                entity.Property(e => e.StockToken).HasColumnName("stock_token");
            });

            modelBuilder.Entity<Trader>(entity =>
            {
                entity.ToTable("traders");

                entity.HasIndex(e => e.UserId, "user_id")
                    .IsUnique();

                entity.Property(e => e.TraderId).HasColumnName("trader_id");

                entity.Property(e => e.BankAccountNumber)
                    .HasMaxLength(255)
                    .HasColumnName("bank_account_number");

                entity.Property(e => e.IfscCode)
                    .HasMaxLength(255)
                    .HasColumnName("ifsc_code");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.User)
                    .WithOne(p => p.Trader)
                    .HasForeignKey<Trader>(d => d.UserId)
                    .HasConstraintName("traders_ibfk_1");
            });

            modelBuilder.Entity<Transaction>(entity =>
            {
                entity.ToTable("transactions");

                entity.HasIndex(e => e.StockId, "stock_id");

                entity.HasIndex(e => e.UserId, "user_id");

                entity.Property(e => e.TransactionId).HasColumnName("transaction_id");

                entity.Property(e => e.PriceAtTransaction)
                    .HasPrecision(15, 2)
                    .HasColumnName("price_at_transaction");

                entity.Property(e => e.Quantity).HasColumnName("quantity");

                entity.Property(e => e.StockId).HasColumnName("stock_id");

                entity.Property(e => e.TransactionDate)
                    .HasColumnType("timestamp")
                    .HasColumnName("transaction_date")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.TransactionType)
                    .HasColumnType("enum('Buy','Sell')")
                    .HasColumnName("transaction_type");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.Stock)
                    .WithMany(p => p.Transactions)
                    .HasForeignKey(d => d.StockId)
                    .HasConstraintName("transactions_ibfk_2");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Transactions)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("transactions_ibfk_1");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("users");

                entity.HasIndex(e => e.Email, "email")
                    .IsUnique();

                entity.HasIndex(e => e.PanCardNumber, "pan_card_number")
                    .IsUnique();

                entity.HasIndex(e => e.RoleId, "role_id");

                entity.HasIndex(e => e.Username, "username")
                    .IsUnique();

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.Property(e => e.ContactNumber)
                    .HasMaxLength(255)
                    .HasColumnName("contact_number");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("timestamp")
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.DateOfBirth).HasColumnName("date_of_birth");

                entity.Property(e => e.Email).HasColumnName("email");

                entity.Property(e => e.FirstName)
                    .HasMaxLength(255)
                    .HasColumnName("first_name");

                entity.Property(e => e.LastName)
                    .HasMaxLength(255)
                    .HasColumnName("last_name");

                entity.Property(e => e.PanCardNumber).HasColumnName("pan_card_number");

                entity.Property(e => e.PasswordHash)
                    .HasMaxLength(255)
                    .HasColumnName("password_hash");

                entity.Property(e => e.ResetToken)
                    .HasMaxLength(255)
                    .HasColumnName("reset_token");

                entity.Property(e => e.RoleId).HasColumnName("role_id");

                entity.Property(e => e.Status)
                    .HasColumnType("enum('ACTIVE','INACTIVE')")
                    .HasColumnName("status")
                    .HasDefaultValueSql("'ACTIVE'");

                entity.Property(e => e.TokenExpiry)
                    .HasMaxLength(6)
                    .HasColumnName("token_expiry");

                entity.Property(e => e.UpdatedAt)
                    .HasColumnType("timestamp")
                    .ValueGeneratedOnAddOrUpdate()
                    .HasColumnName("updated_at")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.Username).HasColumnName("username");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.RoleId)
                    .HasConstraintName("FKp56c1712k691lhsyewcssf40f");
            });

            modelBuilder.Entity<UserToken>(entity =>
            {
                entity.ToTable("user_tokens");

                entity.HasIndex(e => e.ClientCode, "client_code_UNIQUE")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.ClientCode).HasColumnName("client_code");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("timestamp")
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.FeedToken)
                    .HasColumnType("text")
                    .HasColumnName("feed_token");

                entity.Property(e => e.JwtToken)
                    .HasColumnType("text")
                    .HasColumnName("jwt_token");

                entity.Property(e => e.RefreshToken)
                    .HasColumnType("text")
                    .HasColumnName("refresh_token");
            });

            modelBuilder.Entity<VirtualWallet>(entity =>
            {
                entity.HasKey(e => e.WalletId)
                    .HasName("PRIMARY");

                entity.ToTable("virtual_wallet");

                entity.HasIndex(e => e.UserId, "wallet_user_fk_idx");

                entity.Property(e => e.WalletId).HasColumnName("wallet_id");

                entity.Property(e => e.Balance)
                    .HasPrecision(10, 2)
                    .HasColumnName("balance");

                entity.Property(e => e.LastUpdated)
                    .HasColumnType("timestamp")
                    .ValueGeneratedOnAddOrUpdate()
                    .HasColumnName("last_updated")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.VirtualWallets)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("wallet_user_fk");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
