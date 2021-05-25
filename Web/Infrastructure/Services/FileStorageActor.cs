using System;
using Akka.Actor;
using CoronaGlass.Core;

namespace Web.Infrastructure.Services
{
    public class FileStorageActor : ReceiveActor
    {
        public FileStorageActor(IFileStorage fileStorage)
        {
            if(fileStorage == null)
                throw new NullReferenceException(nameof(fileStorage));

            ReceiveAsync<Save>(cmd => fileStorage.Upload(cmd.Folder, cmd.Name, cmd.Data));
            Receive<Find>(cmd =>
            {
                var sender = Sender;
                fileStorage.Search(cmd.Folder, cmd.Name, 100).PipeTo(sender);
            });
            Receive<Get>(cmd => {
                var sender = Sender;
                fileStorage.Download(cmd.Folder, cmd.Name).PipeTo(sender);
            });
        }

        public class Save : FileCommand
        {
            public byte[] Data { get; }

            public Save(string folderName, string fileName, byte[] data)
                : base(folderName, fileName)
            {
                Data = data ?? throw new ArgumentNullException(nameof(data));
            }

        }

        public class Get : FileCommand
        {
            public Get(string folderName, string fileName)
                : base(folderName, fileName)
            {
            }
        }

        public class Find : FileCommand
        {
            public Find(string folderName, string fileName)
                : base(folderName, fileName)
            {
            }
        }
    }
}
