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

            ReceiveAsync<StoreFileCommand>(cmd => fileStorage.Upload(cmd.Folder, cmd.Name, cmd.Data));
            Receive<SearchFileCommand>(cmd =>
            {
                var sender = Sender;
                fileStorage.Search(cmd.Folder, cmd.Name, 100).PipeTo(sender);
            });
            Receive<GetFileCommand>(cmd => {
                var sender = Sender;
                fileStorage.Download(cmd.Folder, cmd.Name).PipeTo(sender);
            });
        }
    }
}
