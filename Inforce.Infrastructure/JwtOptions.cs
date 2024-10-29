using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace Inforce.Infrastructure;

public class JwtOptions
{
    public string Issuer { get; set; }
    public string Audience { get; set; }
    public string Secret { get; set; }
    public int TokenLifetime { get; set; }
    public SymmetricSecurityKey GetSymmetricSecurityKey() =>  
        new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Secret));
}