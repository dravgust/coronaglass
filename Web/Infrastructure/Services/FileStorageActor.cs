using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Akka.Actor;
using CoronaGlass.Core;
using Microsoft.Extensions.Logging;

namespace Web.Infrastructure.Services
{
    public class FileStorageActor : ReceiveActor
    {
        private readonly ILogger<FileStorageActor> _logger;
        private readonly IFileStorage _fileStorage;

        public FileStorageActor(IFileStorage fileStorage, ILogger<FileStorageActor> logger)
        {
            _fileStorage = fileStorage ?? throw new NullReferenceException(nameof(fileStorage));
            _logger = logger;

            Receive<StoreFileCommand>(async cmd => await Send(cmd, cmd.Data));
            Receive<SearchFileCommand>(async cmd => Sender.Tell(await Search(cmd)));
            Receive<GetFileCommand>(async cmd => Sender.Tell(await Get(cmd)));
        }

        public async Task Send(FileCommand cmd, byte[] data)
        {
            try
            {
                var uploadResult = await _fileStorage.Upload(cmd.Folder, cmd.Name, data);
                _logger.LogDebug($"upload: {cmd.Name} => {uploadResult.ToJson()}");
            }
            catch (Exception e)
            {
                _logger.LogDebug(e.Message);
            }
        }

        public async Task<List<string>> Search(FileCommand cmd)
        {
            List<string> result = null;
            try
            {
                result = await _fileStorage.Search(cmd.Folder, cmd.Name, 100);

                _logger.LogDebug($"search: {cmd.Name} => {result.Count}");
            }
            catch (Exception e)
            {
                _logger.LogDebug(e.Message);
            }

            return result;
        }

        public async Task<byte[]> Get(FileCommand cmd)
        {
            byte[] result = null;
            try
            {
                result = await _fileStorage.Download(cmd.Folder, cmd.Name);

                _logger.LogDebug($"download: {cmd.Name} => {result.Length}");
            }
            catch (Exception e)
            {
                _logger.LogDebug(e.Message);
            }
            return result;
        }
    }
}
