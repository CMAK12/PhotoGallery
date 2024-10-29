using Inforce.Core.Models;

namespace Inforce.Core.Stores;

public interface IAlbumStore
{
    Task<IEnumerable<Album>> GetAsync();
    Task<Album> GetAsync(Guid id);
    Task AddAsync(Album album);
    Task UpdateAsync(Album album);
    Task DeleteAsync(Guid id);
}
