using Inforce.Core.Infrastructure;
using Inforce.Core.Stores;
using Inforce.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace Inforce.Persistence;

public class ImageRepository : IImageStore
{
    private readonly GalleryDBContext _db;
    
    public ImageRepository(GalleryDBContext db)
    {
        _db = db;
    }
    
    public async Task<IEnumerable<Image>> GetAsync()
    {
        return await _db.Images.ToListAsync();
    }

    public async Task<Image> GetAsync(Guid id)
    {
        return await _db.Images.FindAsync(id);
    }

    public async Task AddAsync(Image image)
    {
        await _db.Images.AddAsync(image);
        await _db.SaveChangesAsync();
    }

    public async Task UpdateAsync(Image image)
    {
        _db.Images.Update(image);
        await _db.SaveChangesAsync();
    }

    public async Task DeleteAsync(Guid id)
    {
        var foundedUser = await _db.Images.FindAsync(id);
        _db.Images.Remove(foundedUser);
        await _db.SaveChangesAsync();
    }
}