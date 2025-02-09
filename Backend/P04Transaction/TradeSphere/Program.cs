using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using Steeltoe.Discovery.Client;
using TradeSphere.Models;

namespace TradeSphere
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllers()
                .AddJsonOptions(options =>
                {
                    // Avoid cyclic dependency issues in JSON serialization
                    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
                });

            // Configure the DbContext
            builder.Services.AddDbContext<p04_tradespherdbContext>(options =>
                options.UseMySql(
                    builder.Configuration.GetConnectionString("DefaultConnection"),
                    new MySqlServerVersion(new Version(8, 0, 0))
                )
            );

            // Add CORS policy to allow any origin, header, and method
            //builder.Services.AddCors(options =>
            //{
            //    options.AddPolicy("AllowAll", policy =>
            //        policy.AllowAnyHeader()
            //              .AllowAnyMethod()
            //              .SetIsOriginAllowed(_ => true)
            //              .AllowCredentials());
            //});

            // Add Swagger/OpenAPI for API documentation
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Add Steeltoe Discovery Client
            builder.Services.AddDiscoveryClient(builder.Configuration);

            var app = builder.Build();

            // Configure the HTTP request pipeline
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            //app.UseHttpsRedirection();

            // Enable CORS using the configured policy
            //app.UseCors("AllowAll");

            app.UseAuthorization();

            // Use Steeltoe Discovery Client
            //app.UseDiscoveryClient();

            // Map controller routes
            app.MapControllers();

            // Run the application
            app.Run();
        }
    }
}
