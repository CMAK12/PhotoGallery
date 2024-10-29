using Inforce.Core.Infrastructure;
using Inforce.Core.Models;
using Inforce.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Inforce.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthorizationController : ControllerBase
{
    private readonly GalleryDBContext _db;
    private readonly IJwtProvider _jwtProvider;
    private readonly IPasswordHasher _passwordHasher;
    
    public AuthorizationController(GalleryDBContext db, IJwtProvider jwtProvider, IPasswordHasher passwordHasher)
    {
        _db = db;
        _jwtProvider = jwtProvider;
        _passwordHasher = passwordHasher;
    }
    
    [HttpPost]
    public async Task<IActionResult> Login(RegisterUserRequest request)
    {
        var user = await _db.Users
            .FirstOrDefaultAsync(u => u.Username == request.Username);
        
        if (user == null || !_passwordHasher.Verify(request.Password, user.Password)) 
            return Unauthorized();
        
        var token = _jwtProvider.GenerateToken(user);
        
        return Ok(new { AccessToken = token });
    }
}