using System.ComponentModel.DataAnnotations;

namespace Inforce.Core.Models;

public record RegisterUserRequest
(
    [Required] string Username,
    [Required] string Password
);