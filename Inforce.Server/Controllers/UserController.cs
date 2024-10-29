using Inforce.Core.Models;
using Inforce.Core.Stores;
using Inforce.Infrastructure;
using Microsoft.AspNetCore.Mvc;

namespace Inforce.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserStore _repository;
    private readonly IPasswordHasher _passwordHasher;
    
    public UserController(IUserStore repository, IPasswordHasher passwordHasher)
    {
        _repository = repository;
        _passwordHasher = passwordHasher;
    }
    
    [HttpGet("{id}")]
    public async Task<User> GetAsync(Guid id)
    {
        return await _repository.GetAsync(id);
    }
    
    [HttpPost]
    public async Task PostAsync(RegisterUserRequest request)
    {
        User user = new User
        {
            Username = request.Username,
            Password = _passwordHasher.Generate(request.Password)
        };
        await _repository.AddAsync(user);
    }
    
    [HttpPut("{id}")]
    public async Task PutAsync(User user)
    {
        await _repository.UpdateAsync(user);
    }
}