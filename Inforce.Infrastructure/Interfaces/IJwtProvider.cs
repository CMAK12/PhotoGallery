using Inforce.Core.Models;

namespace Inforce.Infrastructure;

public interface IJwtProvider
{
    string GenerateToken(User user);
}