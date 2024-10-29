using Inforce.Core.Infrastructure;
using Inforce.Core.Models;
using Inforce.Core.Stores;
using Microsoft.EntityFrameworkCore;

namespace Inforce.Persistence;

public class UserRepository : IUserStore
{
    private readonly GalleryDBContext _db;
    
    public UserRepository(GalleryDBContext db)
    {
        _db = db;
    }
    
    public async Task<User> GetAsync(Guid id)
    {
        return await _db.Users.FindAsync(id);
    }

    public async Task AddAsync(User user)
    {
        _db.Users.AddAsync(user);
        await _db.SaveChangesAsync();
    }

    public async Task UpdateAsync(User user)
    {
        _db.Users.Update(user);
        await _db.SaveChangesAsync();
    }
}