using Inforce.Core.Models;
using Inforce.Core.Stores;
using Inforce.Infrastructure;
using Microsoft.AspNetCore.Mvc;

namespace Inforce.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ImageController : ControllerBase
{
    private readonly IImageStore _repository;
    private readonly IUploadImageService _uploadImage;
    
    public ImageController(IImageStore repository, IUploadImageService uploadImage)
    {
        _repository = repository;
        _uploadImage = uploadImage;
    }
    
    [HttpGet]
    public async Task<IEnumerable<Image>> GetAsync()
    {
        return await _repository.GetAsync();
    }
    
    [HttpGet("{id}")]
    public async Task<Image> GetAsync(Guid id)
    {
        return await _repository.GetAsync(id);
    }
    
    [HttpPost]
    public async Task PostAsync([FromForm] ImageRequest request)
    {
        var id = Guid.NewGuid();
        var filePath = _uploadImage.SaveImage(request.Image, $"{id}.png");
        
        var image = new Image
        {
            Id = id,
            Url = $"http://localhost:5016/images/{filePath}" ,
            LikesCount = 0,
            DislikesCount = 0,
            UserId = request.UserId,
            AlbumId = request.AlbumId
        };
        
        await _repository.AddAsync(image);
    }
    
    [HttpPut("{id}")]
    public async Task PutAsync(Image image) 
    {
        await _repository.UpdateAsync(image);
    }
    
    [HttpDelete("{id}")]
    public async Task DeleteAsync(Guid id)
    {
        await _repository.DeleteAsync(id);
    }
}