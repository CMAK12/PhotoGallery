using Microsoft.AspNetCore.Http;

namespace Inforce.Core.Models;

public record ImageRequest(
    IFormFile Image,
    string AlbumId,
    string UserId
);