using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TradeSphere.Models;
using TradeSphere.DTO;

namespace TradeSphere.Controllers
{
    [Route("transaction/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly p04_tradespherdbContext _context;

        public PostController(p04_tradespherdbContext context)
        {
            _context = context;
        }

        // Create a new post (Analyst)
        [HttpPost("CreatePost")]
        public async Task<IActionResult> CreatePost([FromBody] PostRequest request)
        {
            var analyst = _context.Analysts.FirstOrDefault(a => a.UserId == request.UserId);
            if (analyst == null) return NotFound("Analyst not found.");

            var stock = _context.Stocks.FirstOrDefault(s => s.StockId == request.StockId);
            if (stock == null) return NotFound("Stock not found.");

            var post = new Post
            {
                StockId = request.StockId,
                AnalystId = analyst.AnalystId,
                Title = request.Title,
                Content = request.Content,
                Datetime = DateTime.Now,
                Likes = 0,
            };

            _context.Posts.Add(post);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Post created successfully.", post });
        }

        // Get all posts with optional filtering by stock
        [HttpGet("GetAllPost")]
        public IActionResult GetPosts([FromQuery] int? stockId)
        {
            var posts = _context.Posts.AsQueryable();

            if (stockId.HasValue)
                posts = posts.Where(p => p.StockId == stockId.Value);

            var result = posts.OrderByDescending(p => p.Datetime).Select(p => new
            {
                p.PostId,
                p.Title,
                p.Content,
                p.Datetime,
                p.Likes,
                AnalystName = p.Analyst.User.FirstName,
                StockName = p.Stock.StockSymbol
            }).ToList();

            return Ok(result);
        }

        // Like a post
        [HttpPost("Like/{postId}")]
        public async Task<IActionResult> LikePost(int postId)
        {
            var post = _context.Posts.FirstOrDefault(p => p.PostId == postId);
            if (post == null) return NotFound("Post not found.");

            post.Likes += 1;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Post liked successfully.", post.Likes });
        }

        // Add a comment to a post
        [HttpPost("{postId}/Comment")]
        public async Task<IActionResult> AddComment(int postId, [FromBody] CommentRequest request)
        {
            var post = _context.Posts.FirstOrDefault(p => p.PostId == postId);
            if (post == null) return NotFound("Post not found.");

            var trader = _context.Traders.FirstOrDefault(t => t.TraderId == request.TraderId);
            if (trader == null) return NotFound("Trader not found.");

            var comment = new Comment
            {
                PostId = postId,
                TraderId = request.TraderId,
                Text = request.Text,
                CommentDate = DateTime.Now
            };

            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Comment added successfully.", comment });
        }

        // Get all comments for a specific post
        [HttpGet("{postId}/Comments")]
        public IActionResult GetComments(int postId)
        {
            var comments = _context.Comments
                .Where(c => c.PostId == postId)
                .Select(c => new
                {
                    c.CommentId,
                    c.Text,
                    c.CommentDate,
                    TraderName = c.Trader.User.FirstName
                }).ToList();

            return Ok(comments);
        }
    }
}
