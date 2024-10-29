using Inforce.Core.Models;

namespace Inforce.Core.Stores;

public interface IImageStore
{
    Task<IEnumerable<Image>> GetAsync();
    Task<Image> GetAsync(Guid id);
    Task AddAsync(Image image);
    Task UpdateAsync(Image image);
    Task DeleteAsync(Guid id);
}
