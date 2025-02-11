using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TradeSphere.Models;

namespace TradeSphere.Controllers
{
    [Route("transaction/[controller]")]
    [ApiController]
    public class PortfolioController : ControllerBase
    {
        private readonly p04_tradespherdbContext _context;

        public PortfolioController(p04_tradespherdbContext context)
        {
            _context = context;
        }

        [HttpGet("CurrentHoldings/{userId}")]
        public IActionResult GetCurrentHoldings(int userId)
        {
            var holdings = _context.Portfolios
                .Where(p => p.UserId == userId && p.Quantity > 0)
                .OrderByDescending(p => p.LastUpdated)
                .Select(p => new
                {
                    StockId = p.StockId,
                    StockSymbol = p.Stock.StockSymbol,
                    Quantity = p.Quantity,
                    AvgPurchasePrice = p.AvgPurchasePrice,
                    TotalInvestment = p.TotalInvestment,
                    CumulativeProfitLoss = p.CumulativeProfitLoss,
                    Status = p.Status,
                    LastUpdated = p.LastUpdated
                })
                .ToList();

            if (!holdings.Any())
                return NotFound("No current holdings found for the user.");

            return Ok(new { UserId = userId, Holdings = holdings });
        }



        [HttpGet("History/{userId}")]
        public IActionResult GetPortfolioHistory(int userId)
        {
            var soldOutPortfolios = _context.Portfolios
                .Where(p => p.UserId == userId && p.Status == "SoldOut")
                .OrderByDescending(p => p.LastUpdated)
                .Select(p => new
                {
                    StockId = p.StockId,
                    StockSymbol = p.Stock.StockSymbol,  
                    AvgPurchasePrice = p.AvgPurchasePrice,
                    CumulativeProfitLoss = p.CumulativeProfitLoss,
                    Status = p.Status,
                    LastUpdated = p.LastUpdated
                })
                .ToList();

            if (!soldOutPortfolios.Any())
                return NotFound("No historical portfolios found.");

            return Ok(soldOutPortfolios);
        }

        [HttpGet("ProfitLoss/{userId}")]
        public IActionResult GetTotalProfitLoss(int userId)
        {
            var portfolios = _context.Portfolios
                .Where(p => p.UserId == userId)
                .ToList();

            if (!portfolios.Any())
                return NotFound("No portfolios found for the user.");

            // Use ?? to provide a default value if CumulativeProfitLoss is null
            decimal totalProfitLoss = portfolios.Sum(p => p.CumulativeProfitLoss ?? 0);

            return Ok(new { UserId = userId, TotalProfitLoss = totalProfitLoss });
        }
    }
}
