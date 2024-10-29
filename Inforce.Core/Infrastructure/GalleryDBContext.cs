using Inforce.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace Inforce.Core.Infrastructure;

public class GalleryDBContext : DbContext
{
    public GalleryDBContext(DbContextOptions<GalleryDBContext> options) : base(options)
    {
        Database.EnsureCreated();
    }
    
    public DbSet<User> Users { get; set; }
    public DbSet<Album> Albums { get; set; }
    public DbSet<Image> Images { get; set; }
}