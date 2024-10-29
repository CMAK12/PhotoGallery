namespace Inforce.Core.Models;

public class Album
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string[] ImageIds { get; set; }
    public string UserId { get; set; }
}