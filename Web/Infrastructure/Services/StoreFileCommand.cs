using System;

namespace Web.Infrastructure.Services
{
    public class StoreFileCommand : FileCommand
    {
        public byte[] Data { get; }

        public StoreFileCommand(string folderName, string fileName, byte[] data) : base(folderName, fileName)
        {
            Data = data ?? throw new ArgumentNullException(nameof(data));
        }

    }
}
