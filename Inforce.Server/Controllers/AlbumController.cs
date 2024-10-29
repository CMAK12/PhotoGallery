using Microsoft.AspNetCore.Mvc;
using Inforce.Core.Models;
using Inforce.Core.Stores;

namespace Inforce.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AlbumController : ControllerBase
{
    private readonly IAlbumStore _repository;
    
    public AlbumController(IAlbumStore repository)
    {
        _repository = repository;
    }
    
    [HttpGet]
    public async Task<IEnumerable<Album>> GetAsync()
    {
        return await _repository.GetAsync();
    }
    
    [HttpGet("{id}")]
    public async Task<Album> GetAsync(Guid id)
    {
        return await _repository.GetAsync(id);
    }
    
    [HttpPost]
    public async Task PostAsync(Album album)
    {
        await _repository.AddAsync(album);
    }
    
    [HttpPut("{id}")]
    public async Task PutAsync(Album album)
    {
        await _repository.UpdateAsync(album);
    }
    
    [HttpDelete("{id}")]
    public async Task DeleteAsync(Guid id)
    {
        await _repository.DeleteAsync(id);
    }
}
