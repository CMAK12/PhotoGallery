namespace Inforce.Core.Models;

public class User
{
    public Guid Id { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
    public string Role { get; set; } = nameof(UserRole.User);
    public string[] AlbumIds { get; set; } = Array.Empty<string>();
    public string[] LikedImagesIds { get; set; } = Array.Empty<string>();
    public string[] DislikedImagesIds { get; set; } = Array.Empty<string>();
}