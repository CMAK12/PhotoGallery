using Microsoft.AspNetCore.Http;

namespace Inforce.Infrastructure;

public interface IUploadImageService
{
    string SaveImage(IFormFile imageBytes, string filePath);
    byte[] ConvertIFormFileToByteArray(IFormFile file);
}