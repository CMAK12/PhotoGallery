using System.Runtime.CompilerServices;

namespace Inforce.Core.Models;

public record PatchUserRequest(
    string? likedImageId,
    string? dislikedImageId
    );