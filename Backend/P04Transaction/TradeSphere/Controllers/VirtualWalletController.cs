using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TradeSphere.Models;
using TradeSphere.DTO;

namespace TradeSphere.Controllers
{
    [Route("transaction/[controller]")]
    [ApiController]
    public class VirtualWalletController : ControllerBase
    {
        private readonly p04_tradespherdbContext _context;

        public VirtualWalletController(p04_tradespherdbContext context)
        {
            _context = context;
        }

        // GET: api/VirtualWallet/ViewBalance/{userId}
        [HttpGet("ViewBalance/{userId}")]
        public IActionResult ViewBalance(int userId)
        {
            // Check if the trader exists
            var trader = _context.Traders.FirstOrDefault(t => t.UserId == userId);
            if (trader == null)
            {
                return NotFound("Trader not found.");
            }

            // Check if wallet exists for the trader
            var wallet = _context.VirtualWallets.FirstOrDefault(w => w.UserId == userId);
            if (wallet == null)
            {
                return NotFound("Wallet for the specified trader not found.");
            }

            return Ok(new { message = "Balance retrieved successfully.", wallet.Balance });
        }


        // POST: api/VirtualWallet/AddBalance
        [HttpPost("AddBalance")]
        public async Task<IActionResult> AddBalance([FromBody] WalletRequest request)
        {
            if (request.Amount <= 0)
            {
                return BadRequest("Amount must be greater than zero.");
            }

            // Check if the trader exists
            var trader = _context.Traders.FirstOrDefault(t => t.UserId == request.UserId);
            if (trader == null)
            {
                return NotFound("Trader not found.");
            }

            // Check if wallet exists for the trader
            var wallet = _context.VirtualWallets.FirstOrDefault(w => w.UserId == request.UserId);
            if (wallet == null)
            {
                wallet = new VirtualWallet
                {
                    UserId = request.UserId,
                    Balance = request.Amount,
                    LastUpdated = DateTime.Now
                };

                _context.VirtualWallets.Add(wallet);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Wallet created and balance added successfully.", wallet.Balance });
            }

            wallet.Balance += request.Amount;
            wallet.LastUpdated = DateTime.Now;

            await _context.SaveChangesAsync();
            return Ok(new { message = "Balance added successfully.", wallet.Balance });
        }

        // POST: api/VirtualWallet/WithdrawBalance
        [HttpPost("WithdrawBalance")]
        public async Task<IActionResult> WithdrawBalance([FromBody] WalletRequest request)
        {
            if (request.Amount <= 0)
            {
                return BadRequest("Amount must be greater than zero.");
            }

            // Check if the trader exists
            var trader = _context.Traders.FirstOrDefault(t => t.UserId == request.UserId);
            if (trader == null)
            {
                return NotFound("Trader not found.");
            }

            var wallet = _context.VirtualWallets.FirstOrDefault(w => w.UserId == request.UserId);
            if (wallet == null)
            {
                return NotFound("Wallet for the specified trader not found.");
            }

            if (wallet.Balance < request.Amount)
            {
                return BadRequest("Insufficient balance.");
            }

            wallet.Balance -= request.Amount;
            wallet.LastUpdated = DateTime.Now;

            await _context.SaveChangesAsync();
            return Ok(new { message = "Withdrawal successful.", wallet.Balance });
        }
    }
}
