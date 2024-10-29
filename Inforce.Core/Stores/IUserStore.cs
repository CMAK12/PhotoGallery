using Inforce.Core.Models;

namespace Inforce.Core.Stores;

public interface IUserStore
{
    Task<User> GetAsync(Guid id);
    Task AddAsync(User user);
    Task UpdateAsync(User user);
}