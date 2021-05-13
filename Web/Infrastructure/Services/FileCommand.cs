using System;

namespace Web.Infrastructure.Services
{
    public class FileCommand
    {
        public string Folder { get; } = $"/WebForm";
        public string Name { get; } = "Customers.xlsx";

        public FileCommand(string folderName, string fileName)
        {
            Folder = folderName;
            if (string.IsNullOrEmpty(fileName))
                throw new ArgumentNullException(nameof(fileName));
            Name = fileName;
        }
    }
}
