using Inforce.Core.Infrastructure;
using Inforce.Core.Models;
using Inforce.Core.Stores;
using Microsoft.EntityFrameworkCore;

namespace Inforce.Persistence;

public class AlbumRepository : IAlbumStore
{
    private readonly GalleryDBContext _db;
    
    public AlbumRepository(GalleryDBContext db)
    {
        _db = db;
    }
    
    public async Task<IEnumerable<Album>> GetAsync()
    {
        return await _db.Albums.ToListAsync();
    }

    public async Task<Album> GetAsync(Guid id)
    {
        return await _db.Albums.FindAsync(id);
    }

    public async Task AddAsync(Album album)
    {
        await _db.Albums.AddAsync(album);
        await _db.SaveChangesAsync();
    }

    public async Task UpdateAsync(Album album)
    {
        _db.Albums.Update(album);
        await _db.SaveChangesAsync();
    }

    public async Task DeleteAsync(Guid id)
    {
        var foundedUser = await _db.Albums.FindAsync(id);
        _db.Albums.Remove(foundedUser);
        await _db.SaveChangesAsync();
    }
}