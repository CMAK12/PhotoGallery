namespace Inforce.Core.Models;

public class Image
{
    public Guid Id { get; set; }
    public string Url { get; set; }
    public uint LikesCount { get; set; }
    public uint DislikesCount { get; set; }
    public string AlbumId { get; set; }
    public string UserId { get; set; }
}