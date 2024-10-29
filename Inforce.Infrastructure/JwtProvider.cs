using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Inforce.Core.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Inforce.Infrastructure;

public class JwtProvider : IJwtProvider
{
    private readonly IOptions<JwtOptions> _options;
    
    public JwtProvider(IOptions<JwtOptions> options)
    {   
        _options = options;
    }
    
    public string GenerateToken(User user)
    {
        var authParams = _options.Value;

        var securityKey = authParams.GetSymmetricSecurityKey();
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new List<Claim>()
        {
            new Claim(JwtRegisteredClaimNames.Name, user.Username),
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(ClaimTypes.Role, user.Role)
        };

        var token = new JwtSecurityToken(
            authParams.Issuer,
            authParams.Audience,
            claims,
            expires: DateTime.Now.AddSeconds(authParams.TokenLifetime),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}