using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TradeSphere.Models;
using TradeSphere.DTO;

namespace TradeSphere.Controllers
{
    [Route("transaction/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly p04_tradespherdbContext _context;

        public TransactionController(p04_tradespherdbContext context)
        {
            _context = context;
        }

        // POST: api/Transaction/Buy
        [HttpPost("Buy")]
        public async Task<IActionResult> BuyStock([FromBody] TransactionRequest request)
        {
            if (request.Quantity <= 0 || request.PriceAtTransaction <= 0)
                return BadRequest("Quantity and Price must be greater than zero.");

            var user = _context.Traders.FirstOrDefault(u => u.UserId == request.UserId);
            if (user == null)
                return NotFound("Trader not found.");

            var stock = _context.Stocks.FirstOrDefault(s => s.StockId == request.StockId);
            if (stock == null)
                return NotFound("Stock not found.");

            // Check if the wallet exists for the user
            var wallet = _context.VirtualWallets.FirstOrDefault(w => w.UserId == request.UserId);
            if (wallet == null)
                return NotFound("Wallet not found for the user.");

            decimal totalCost = request.Quantity * request.PriceAtTransaction;

            // Check if wallet has enough balance
            if (wallet.Balance < totalCost)
                return BadRequest("Insufficient balance in the wallet.");

            // Create the buy transaction
            var transaction = new Transaction
            {
                UserId = request.UserId,
                StockId = request.StockId,
                TransactionType = "Buy",
                Quantity = request.Quantity,
                PriceAtTransaction = request.PriceAtTransaction,
                TransactionDate = DateTime.Now
            };

            // Deduct the total cost from the wallet balance
            wallet.Balance -= totalCost;
            wallet.LastUpdated = DateTime.Now;

            // Update Portfolio
            var portfolio = _context.Portfolios.FirstOrDefault(p => p.UserId == request.UserId && p.StockId == request.StockId);
            if (portfolio == null)
            {
                portfolio = new Portfolio
                {
                    UserId = request.UserId,
                    StockId = request.StockId,
                    Quantity = request.Quantity,
                    AvgPurchasePrice = request.PriceAtTransaction,
                    TotalInvestment = totalCost,
                    CumulativeProfitLoss = 0,
                    LastUpdated = DateTime.Now
                };
                _context.Portfolios.Add(portfolio);
            }
            else
            {
                portfolio.TotalInvestment += totalCost;
                portfolio.Quantity += request.Quantity;
                portfolio.AvgPurchasePrice = portfolio.TotalInvestment / portfolio.Quantity;
                portfolio.Status = "Active";
                portfolio.LastUpdated = DateTime.Now;
            }

            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Stock purchased successfully.", transaction, wallet.Balance });
        }

        // POST: api/Transaction/Sell
        [HttpPost("Sell")]
        public async Task<IActionResult> SellStock([FromBody] TransactionRequest request)
        {
            if (request.Quantity <= 0 || request.PriceAtTransaction <= 0)
                return BadRequest("Quantity and Price must be greater than zero.");

            var user = _context.Traders.FirstOrDefault(u => u.UserId == request.UserId);
            if (user == null)
                return NotFound("Trader not found.");

            var stock = _context.Stocks.FirstOrDefault(s => s.StockId == request.StockId);
            if (stock == null)
                return NotFound("Stock not found.");

            var portfolio = _context.Portfolios.FirstOrDefault(p => p.UserId == request.UserId && p.StockId == request.StockId);
            if (portfolio == null || portfolio.Quantity < request.Quantity)
                return BadRequest("Insufficient stock quantity in the portfolio.");

            var wallet = _context.VirtualWallets.FirstOrDefault(w => w.UserId == request.UserId);
            if (wallet == null)
                return NotFound("Wallet not found for the user.");

            decimal totalSaleAmount = request.Quantity * request.PriceAtTransaction;
            decimal avgPurchaseCost = request.Quantity * portfolio.AvgPurchasePrice;
            decimal profitOrLoss = totalSaleAmount - avgPurchaseCost;

            // Update Portfolio
            portfolio.Quantity -= request.Quantity;
            portfolio.TotalInvestment -= avgPurchaseCost;
            portfolio.CumulativeProfitLoss += profitOrLoss;
            portfolio.LastUpdated = DateTime.Now;

            if (portfolio.Quantity == 0)
            {
                portfolio.Status = "SoldOut";
                portfolio.LastUpdated = DateTime.Now;
            }

            // Create Sell Transaction
            var transaction = new Transaction
            {
                UserId = request.UserId,
                StockId = request.StockId,
                TransactionType = "Sell",
                Quantity = request.Quantity,
                PriceAtTransaction = request.PriceAtTransaction,
                TransactionDate = DateTime.Now
            };

            // Credit the total sale amount to the wallet
            wallet.Balance += totalSaleAmount;
            wallet.LastUpdated = DateTime.Now;

            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Stock sold successfully.", transaction, wallet.Balance, profitOrLoss });
        }

        [HttpGet("TransactionHistory/{userId}")]
        public IActionResult GetTransactionHistory(int userId)
        {
            var transactionHistory = _context.Transactions
                .Where(t => t.UserId == userId)
                .OrderByDescending(t => t.TransactionDate) // Show recent transactions first
                .Select(t => new
                {
                    TransactionId = t.TransactionId,
                    StockId = t.StockId,
                    StockSymbol = t.Stock.StockSymbol,
                    TransactionType = t.TransactionType,
                    Quantity = t.Quantity,
                    PriceAtTransaction = t.PriceAtTransaction,
                    TotalAmount = t.Quantity * t.PriceAtTransaction,
                    TransactionDate = t.TransactionDate
                })
                .ToList();

            if (!transactionHistory.Any())
                return NotFound("No transaction history found for the user.");

            return Ok(new { UserId = userId, Transactions = transactionHistory });
        }
    }
}
