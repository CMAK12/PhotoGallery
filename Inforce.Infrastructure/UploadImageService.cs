using Microsoft.AspNetCore.Http;

namespace Inforce.Infrastructure;

public class UploadImageService : IUploadImageService
{
    public string SaveImage(IFormFile imageBytes, string filePath)
    {
        var directoryPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");
        if (!Directory.Exists(directoryPath))
        {
            Directory.CreateDirectory(directoryPath);
        }

        var fullPath = Path.Combine(directoryPath, filePath);
        using (var stream = new FileStream(fullPath, FileMode.Create))
        {
            stream.Write(ConvertIFormFileToByteArray(imageBytes));
        }

        return filePath;
    }
    
    public byte[] ConvertIFormFileToByteArray(IFormFile file)
    {
        if (file == null || file.Length == 0)
            return null;

        using (var memoryStream = new MemoryStream())
        {
            file.CopyTo(memoryStream);
            return memoryStream.ToArray();
        }
    }    
}
